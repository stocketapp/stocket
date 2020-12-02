import React, { useEffect, useRef, ReactNode } from 'react'
import { StatusBar, View, AppState } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import messaging from '@react-native-firebase/messaging'
import RNBootSplash from 'react-native-bootsplash'
import {
  useAuthState,
  useSetUserInfo,
  useIapProducts,
  useSubscribeMarketHours,
  useSaveApnsToken,
} from './src/hooks'
import { BACKGROUND } from './src/utils/colors'
import TradeView from './src/views/TradeView'
import MainStack from './src/navigation/AppStack'
import AuthStack from './src/navigation/AuthenticationStack'
import crashlytics from '@react-native-firebase/crashlytics'
import Shake from '@shakebugs/react-native-shake'

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage)
})

export default function App(): ReactNode {
  const { isAuth, currentUser } = useAuthState()
  const tradeViewRef = useRef()
  const { loading } = useSetUserInfo()
  useIapProducts(currentUser?.uid)
  useSaveApnsToken(currentUser?.uid)
  useSubscribeMarketHours()

  useEffect(() => {
    crashlytics().log('App Mounted')
    Shake.start()
    if (!loading) {
      RNBootSplash.hide({ fade: true })
    }
  }, [loading])

  useEffect(() => {
    const requestNotificationPermission = async () => {
      await messaging().requestPermission()
    }
    requestNotificationPermission()
  }, [])

  useEffect(() => {
    const deleteCache = async (state: string) => {
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
