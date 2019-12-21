/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react'
import { SafeAreaView, StatusBar, View } from 'react-native'
import switchNavigator from 'navigation'
import { useAuthState } from 'stocket-hooks'
import { createAppContainer } from 'react-navigation'
import RNBootSplash from 'react-native-bootsplash'
import { BLACK } from 'utils/colors'

export default function App(): React$Node {
  const { isAuth } = useAuthState()

  useEffect(() => {
    RNBootSplash.hide({ duration: 250 })
  }, [])

  const navigator = switchNavigator(!isAuth ? 'AuthStack' : 'MainStack')
  const NavigationRoutes = createAppContainer(navigator)

  const container = {
    flex: 1,
    backgroundColor: BLACK,
    paddingHorizontal: 16,
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={container}>
        <View style={container}>
          <NavigationRoutes />
        </View>
      </SafeAreaView>
    </>
  )
}
