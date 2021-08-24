import 'react-native-gesture-handler'
import { AppRegistry, LogBox } from 'react-native'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import RNAsyncStorageFlipper from 'rn-async-storage-flipper'
import AsyncStorage from '@react-native-community/async-storage'
// import codePush from 'react-native-code-push'
import { ApolloProvider } from '@apollo/client'
import Reactotron from 'reactotron-react-native'
import { ThemeProvider } from '@emotion/react'
import { useFlipper } from '@react-navigation/devtools'
import * as Sentry from '@sentry/react-native'
import App from './App'
import { name as appName } from './app.json'
import configureStore from './src/redux/configureStore'
import client from './src/ApolloClient'
import theme from './src/theme'

const store = configureStore()
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

const routingInstrumentation = new Sentry.ReactNavigationV5Instrumentation()
if (!__DEV__) {
  Sentry.init({
    dsn: 'https://0e632d3ccb63458f98b7e70784b7819c@o563230.ingest.sentry.io/5741924',
    tracesSampleRate: 0.2,
    environment: __DEV__ ? 'development' : 'production',
    integrations: [
      new Sentry.ReactNativeTracing({
        tracingOrigins: [
          'localhost',
          'api.stocketapp.com',
          'api.stocketapp.com/graphql',
          /^\//,
        ],
        routingInstrumentation,
        beforeNavigate: context => {
          if (context.data.route.name === 'Do Not Send') {
            context.sampled = false
          }
          context.name = context.name.toUpperCase()
          context.tags = {
            ...context.tags,
            customTag: 'value',
          }
          return context
        },
      }),
    ],
  })
}

const AppRoot = () => {
  const navigationRef = useNavigationContainerRef()
  useFlipper(navigationRef)

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        if (!__DEV__) {
          routingInstrumentation.registerNavigationContainer(navigationRef)
        }
      }}
    >
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
