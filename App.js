/* eslint-disable react-hooks/exhaustive-deps */
// @flow

import React, { useEffect, useRef } from 'react'
import { StatusBar, View } from 'react-native'
import { useAuthState, useSetUserInfo } from 'hooks'
// import RNBootSplash from 'react-native-bootsplash'
import { BACKGROUND } from 'utils/colors'
import { getProductValue } from 'utils/functions'
import OneSignal from 'react-native-onesignal'
import { ONESIGNAL_APPID, IAPHUB_API_KEY, IAPHUB_APPID } from './config'
import TradeView from 'views/TradeView'
import * as RNIap from 'react-native-iap'
import IapHub from 'react-native-iaphub'
import firestore from '@react-native-firebase/firestore'
import MainStack from './src/navigation/AppStack'
import AuthStack from './src/navigation/AuthenticationStack'

export default function App(): React$Node {
  const { isAuth, currentUser } = useAuthState()
  const {} = useSetUserInfo(currentUser)
  const tradeViewRef = useRef()

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
        await IapHub.init({
          appId: IAPHUB_APPID,
          apiKey: IAPHUB_API_KEY,
          environment: 'development',
        })
        await RNIap.initConnection()
      } catch (err) {
        console.log(err)
      }
    }

    initIAP()
  }, [])

  useEffect(() => {
    const iapHubLogin = async () => {
      await IapHub.login(currentUser?.uid)
      await IapHub.getUser()
    }
    iapHubLogin()
  }, [currentUser])

  useEffect(() => {
    const purchaseUpdatedListener = RNIap.purchaseUpdatedListener(
      async purchase => {
        const value = getProductValue(purchase.productId).value
        await firestore()
          .collection('Users')
          .doc(currentUser?.uid)
          .update({
            cash: firestore.FieldValue.increment(value),
          })
        RNIap.finishTransaction(purchase, true)
      },
    )

    return () => purchaseUpdatedListener.remove()
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
