// @flow

import React, { useEffect, useRef } from 'react'
import { StatusBar, View } from 'react-native'
import MainStack from './src/navigation/AppStack'
import AuthStack from './src/navigation/AuthenticationStack'
import { useAuthState, useSetUserInfo } from 'hooks'
// import RNBootSplash from 'react-native-bootsplash'
import { BACKGROUND } from 'utils/colors'
import OneSignal from 'react-native-onesignal'
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
