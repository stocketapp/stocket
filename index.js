/**
 * @format
 */

import React from 'react'
import { AppRegistry } from 'react-native'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import App from './App'
import { name as appName } from './app.json'
import { Provider } from 'react-redux'
import configureStore from './src/redux/configureStore'
import '@react-native-firebase/crashlytics'

const store = configureStore()

const AppRoot = () => (
  <Provider store={store}>
    <SafeAreaProvider>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </SafeAreaProvider>
  </Provider>
)

AppRegistry.registerComponent(appName, () => AppRoot)
