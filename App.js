// @flow

import React, { useEffect, useRef } from 'react'
import { StatusBar, View } from 'react-native'
import { useAuthState, useSetUserInfo, useIapHub } from 'hooks'
// import RNBootSplash from 'react-native-bootsplash'
import { BACKGROUND } from 'utils/colors'
import { IAPHUB_API_KEY, IAPHUB_APPID, IAPHUB_ENV } from './config'
import TradeView from 'views/TradeView'
import * as RNIap from 'react-native-iap'
import IapHub from 'react-native-iaphub'
import MainStack from './src/navigation/AppStack'
import AuthStack from './src/navigation/AuthenticationStack'

const iapHubConfig = {
  appId: IAPHUB_APPID,
  apiKey: IAPHUB_API_KEY,
  environment: IAPHUB_ENV,
}

export default function App(): React$Node {
  const { isAuth, currentUser } = useAuthState()
  const tradeViewRef = useRef()
  useSetUserInfo(currentUser)
  useIapHub()

  // useEffect(() => {
  //   if (!loading) {
  //     RNBootSplash.hide({ duration: 250 })
  //   }
  // }, [loading])

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
