import 'react-native-gesture-handler'
import { AppRegistry, LogBox } from 'react-native'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import '@react-native-firebase/crashlytics'
import RNAsyncStorageFlipper from 'rn-async-storage-flipper'
import AsyncStorage from '@react-native-community/async-storage'
// import codePush from 'react-native-code-push'
import { ApolloProvider } from '@apollo/client'
import Reactotron from 'reactotron-react-native'
import { ThemeProvider } from '@emotion/react'
const store = configureStore()
import { useFlipper } from '@react-navigation/devtools'
import App from './App'
import { name as appName } from './app.json'
import configureStore from './src/redux/configureStore'
import client from './src/ApolloClient'
import theme from './src/theme'

if (global.HermesInternal) {
  // Hide timers warning (Android only)
  LogBox.ignoreLogs(['Setting a timer'])
  // Polyfills required to use Intl with Hermes engine
  require('@formatjs/intl-getcanonicallocales/polyfill')
  require('@formatjs/intl-locale/polyfill')
  require('@formatjs/intl-pluralrules/polyfill')
  require('@formatjs/intl-pluralrules/locale-data/en')
  require('@formatjs/intl-numberformat/polyfill')
  require('@formatjs/intl-numberformat/locale-data/en')
  require('@formatjs/intl-datetimeformat/polyfill')
  require('@formatjs/intl-datetimeformat/locale-data/en')
}

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
