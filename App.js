// @flow

import React, { useEffect, useRef } from 'react'
import { StatusBar } from 'react-native'
import MainStack from './src/navigation/MainStack'
import AuthStack from './src/navigation/AuthStack'
import { useAuthState, useSetUserInfo } from 'hooks'
// import RNBootSplash from 'react-native-bootsplash'
import { BACKGROUND } from 'utils/colors'
import OneSignal from 'react-native-onesignal'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ONESIGNAL_APPID } from './config'
import TradeView from 'views/TradeView'

export default function App(): React$Node {
  const { isAuth, currentUser } = useAuthState()
  const { loading } = useSetUserInfo(currentUser)
  const tradeViewRef = useRef()

  // useEffect(() => {
  //   if (!loading) {
  //     RNBootSplash.hide({ duration: 250 })
  //   }
  // }, [loading])

  useEffect(() => {
    OneSignal.init(ONESIGNAL_APPID)
  }, [])

  if (!isAuth) {
    return <AuthStack />
  }

  return (
    <SafeAreaView style={container}>
      <StatusBar barStyle="light-content" />
      <MainStack />
      <TradeView ref={tradeViewRef} />
    </SafeAreaView>
  )
}

const container = {
  flex: 1,
  backgroundColor: BACKGROUND,
}
