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
import RNAsyncStorageFlipper from 'rn-async-storage-flipper'
import AsyncStorage from '@react-native-community/async-storage'
import codePush from 'react-native-code-push'
import { ApolloProvider } from '@apollo/client'
import client from './ApolloClient'
import Reactotron from 'reactotron-react-native'
// import { ThemeProvider } from '@emotion/react'
// import theme from './src/theme'
const store = configureStore()

if (__DEV__) {
  RNAsyncStorageFlipper(AsyncStorage)
  Reactotron.setAsyncStorageHandler(AsyncStorage).configure().useReactNative().connect()
}

const AppRoot = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          {/* <ThemeProvider theme={theme}> */}
          <App />
          {/* </ThemeProvider> */}
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  </ApolloProvider>
)

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
}

const Root = __DEV__ ? AppRoot : codePush(codePushOptions)(AppRoot)

AppRegistry.registerComponent(appName, () => Root)
