// @flow

import React, { useEffect, useRef } from 'react'
import { StatusBar, View } from 'react-native'
import { useAuthState, useSetUserInfo, usePurchaseUpdatedListener } from 'hooks'
// import RNBootSplash from 'react-native-bootsplash'
import { BACKGROUND } from 'utils/colors'
import OneSignal from 'react-native-onesignal'
import { ONESIGNAL_APPID, IAPHUB_API_KEY, IAPHUB_APPID } from './config'
import TradeView from 'views/TradeView'
import * as RNIap from 'react-native-iap'
import IapHub from 'react-native-iaphub'
import MainStack from './src/navigation/AppStack'
import AuthStack from './src/navigation/AuthenticationStack'

const iapHubConfig = {
  appId: IAPHUB_APPID,
  apiKey: IAPHUB_API_KEY,
  environment: 'development',
}

export default function App(): React$Node {
  const { isAuth, currentUser } = useAuthState()
  const {} = useSetUserInfo(currentUser)
  const tradeViewRef = useRef()
  usePurchaseUpdatedListener()

  // useEffect(() => {
  //   if (!loading) {
  //     RNBootSplash.hide({ duration: 250 })
  //   }
  // }, [loading])

  useEffect(() => {
    OneSignal.init(ONESIGNAL_APPID)
  }, [])

  useEffect(() => {
    const initIAP = async () => {
      try {
        await IapHub.init(iapHubConfig)
        await RNIap.initConnection()
      } catch (err) {
        console.log('initIAP', err)
      }
    }
    initIAP()
  }, [])

  if (!isAuth) {
    return <AuthStack />
  }

  return (
    <View style={container}>
      <StatusBar barStyle="light-content" />
      <MainStack />
      <TradeView ref={tradeViewRef} />
    </View>
  )
}

const container = {
  flex: 1,
  backgroundColor: BACKGROUND,
}
