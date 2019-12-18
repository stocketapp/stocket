/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import NavigationRoutes from 'navigation'

export default function App(): React$Node {
  const container = {
    flex: 1,
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={container}>
        <NavigationRoutes />
      </SafeAreaView>
    </>
  )
}
