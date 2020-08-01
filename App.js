// @flow

import React, { useEffect, useRef } from 'react'
import { StatusBar, View, AppState } from 'react-native'
import {
  useAuthState,
  useSetUserInfo,
  useIapProducts,
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
import AsyncStorage from '@react-native-community/async-storage'

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage)
})

export default function App(): React$Node {
  const { isAuth, currentUser } = useAuthState()
  const tradeViewRef = useRef()
  const { loading } = useSetUserInfo(currentUser)
  useIapProducts(currentUser?.uid)
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
      await messaging().requestPermission()
    }
    requestNotificationPermission()
  }, [])

  useEffect(() => {
    const deleteCache = async state => {
      try {
        if (state === 'background') {
          await AsyncStorage.clear()
        }
      } catch (err) {
        console.log(err)
      }
    }
    AppState.addEventListener('change', deleteCache)

    return () => AppState.removeEventListener('change', deleteCache)
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
