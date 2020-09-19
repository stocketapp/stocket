import React, { useEffect, useRef, ReactNode } from 'react'
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
import messaging from '@react-native-firebase/messaging'
import MainStack from './src/navigation/AppStack'
import AuthStack from './src/navigation/AuthenticationStack'
import AsyncStorage from '@react-native-community/async-storage'

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage)
})
// comment
export default function App(): ReactNode {
  const { isAuth, currentUser } = useAuthState()
  const tradeViewRef = useRef()
  const { loading } = useSetUserInfo(currentUser)
  useIapProducts(currentUser?.uid)
  useSaveApnsToken(currentUser?.uid)
  useSubscribeMarketHours()

  useEffect(() => {
    if (!loading) {
      RNBootSplash.hide({ duration: 300 })
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