import 'react-native-gesture-handler'
import { AppRegistry } from 'react-native'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import App from './App'
import { name as appName } from './app.json'
import { Provider } from 'react-redux'
import configureStore from './src/redux/configureStore'
import '@react-native-firebase/crashlytics'
import RNAsyncStorageFlipper from 'rn-async-storage-flipper'
import AsyncStorage from '@react-native-community/async-storage'
// import codePush from 'react-native-code-push'
import { ApolloProvider } from '@apollo/client'
import client from './src/ApolloClient'
import Reactotron from 'reactotron-react-native'
import { ThemeProvider } from '@emotion/react'
import theme from './src/theme'
const store = configureStore()
import { useFlipper } from '@react-navigation/devtools'

if (__DEV__) {
  RNAsyncStorageFlipper(AsyncStorage)
  Reactotron.setAsyncStorageHandler(AsyncStorage).configure().useReactNative().connect()
}

const AppRoot = () => {
  const navigationRef = useNavigationContainerRef()
  useFlipper(navigationRef)

  return (
    <NavigationContainer ref={navigationRef}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <SafeAreaProvider>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </SafeAreaProvider>
        </Provider>
      </ApolloProvider>
    </NavigationContainer>
  )
}

// const codePushOptions = {
//   checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
//   installMode: codePush.InstallMode.ON_NEXT_RESUME,
// }

// const Root = __DEV__ ? AppRoot : codePush(codePushOptions)(AppRoot)

AppRegistry.registerComponent(appName, () => AppRoot)
