/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import switchNavigator from 'navigation'
import { useAuthState, useSetUserInfo } from 'hooks'
import { createAppContainer, SafeAreaView } from 'react-navigation'
import RNBootSplash from 'react-native-bootsplash'
import { BLACK } from 'utils/colors'
import messaging from '@react-native-firebase/messaging'
import { getFcmToken, requestNotificationPermission } from 'utils/functions'

export default function App(): React$Node {
  const { isAuth } = useAuthState()
  const { loading } = useSetUserInfo()

  useEffect(() => {
    if (isAuth && !loading) {
      RNBootSplash.hide({ duration: 250 })
    } else {
      RNBootSplash.hide({ duration: 250 })
    }
  }, [isAuth, loading])

  useEffect(() => {
    async function checkNotificationPermission() {
      const isEnabled = await messaging().hasPermission()

      if (isEnabled) {
        getFcmToken()
      } else {
        requestNotificationPermission()
      }
    }

    checkNotificationPermission()
  }, [])

  const navigator = switchNavigator(!isAuth ? 'AuthStack' : 'MainStack')
  const NavigationRoutes = createAppContainer(navigator)

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView
        style={container}
        forceInset={{ top: 'always', bottom: 'never' }}
      >
        <NavigationRoutes />
      </SafeAreaView>
    </>
  )
}

const container = {
  flex: 1,
  backgroundColor: BLACK,
}
