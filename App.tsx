import { useEffect, useRef, ReactNode } from 'react'
import { StatusBar, View } from 'react-native'
import RNBootSplash from 'react-native-bootsplash'
import { useAuthState, useIapProducts } from './src/hooks'
import { BACKGROUND } from './src/utils/colors'
import TradeView from './src/views/TradeView'
import MainStack from './src/navigation/AppStack'
import AuthStack from './src/navigation/AuthenticationStack'
import crashlytics from '@react-native-firebase/crashlytics'
import { useReactiveVar } from '@apollo/client'
import { isWatchlistLoadingVar, isPortfolioLoadingVar } from './src/Cache'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function App(): ReactNode {
  const { isAuth, currentUser } = useAuthState()
  const tradeViewRef = useRef()
  useIapProducts(currentUser?.uid)
  const isWatchlistLoading = useReactiveVar(isWatchlistLoadingVar)
  const isPortfolioLoading = useReactiveVar(isPortfolioLoadingVar)
  const { top: insetTop } = useSafeAreaInsets()

  useEffect(() => {
    crashlytics().log('App Mounted')
    if (
      (!isWatchlistLoading && !isPortfolioLoading && isAuth) ||
      (!isAuth && !isWatchlistLoading && !isPortfolioLoading)
    ) {
      RNBootSplash.hide({ fade: true })
    }
  }, [isWatchlistLoading, isAuth, isPortfolioLoading])

  if (!isAuth && !isWatchlistLoading) {
    return <AuthStack />
  }

  return (
    <View style={[container, { paddingTop: insetTop }]}>
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
