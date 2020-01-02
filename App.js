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

  const navigator = switchNavigator(!isAuth ? 'AuthStack' : 'MainStack')
  const NavigationRoutes = createAppContainer(navigator)

  const container = {
    flex: 1,
    backgroundColor: BLACK,
  }

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
