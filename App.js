// @flow

import React, { useEffect, useRef } from 'react'
import { StatusBar, View } from 'react-native'
import {
  useAuthState,
  useSetUserInfo,
  useIapHub,
  useSubscribeMarketHours,
  useSaveApnsToken,
} from 'hooks'
import RNBootSplash from 'react-native-bootsplash'
import { BACKGROUND } from 'utils/colors'
import TradeView from 'views/TradeView'
import * as RNIap from 'react-native-iap'
import messaging from '@react-native-firebase/messaging'
import MainStack from './src/navigation/AppStack'
import AuthStack from './src/navigation/AuthenticationStack'

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage)
})

export default function App(): React$Node {
  const { isAuth, currentUser } = useAuthState()
  const tradeViewRef = useRef()
  const { loading } = useSetUserInfo(currentUser)
  useIapHub(currentUser?.uid)
  useSubscribeMarketHours()
  useSaveApnsToken(currentUser?.uid)

  useEffect(() => {
    if (!loading) {
      RNBootSplash.hide({ duration: 300 })
    }
  }, [loading])

  useEffect(() => {
    const initIAP = async () => {
      try {
        await RNIap.initConnection()
      } catch (err) {
        console.log('initIAP', err)
      }
    }
    initIAP()
  }, [])

  useEffect(() => {
    const requestNotificationPermission = async () => {
      const authorizationStatus = await messaging().requestPermission()
      if (authorizationStatus) {
        console.log('Stocket is authorized to receive notifications')
      }
    }

    requestNotificationPermission()
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
