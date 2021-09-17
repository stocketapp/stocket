import { useEffect, ReactNode } from 'react'
import { StatusBar, View } from 'react-native'
import RNBootSplash from 'react-native-bootsplash'
import { useAuthState, useIapInit } from './src/hooks'
import { BACKGROUND } from './src/utils/colors'
import MainStack from './src/navigation/AppStack'
import AuthStack from './src/navigation/AuthenticationStack'
import { useReactiveVar } from '@apollo/client'
import { isWatchlistLoadingVar, isPortfolioLoadingVar } from './src/Cache'

export default function App(): ReactNode {
  const { isAuthed, user } = useAuthState()
  useIapInit(user?.uid)
  const isWatchlistLoading = useReactiveVar(isWatchlistLoadingVar)
  const isPortfolioLoading = useReactiveVar(isPortfolioLoadingVar)

  useEffect(() => {
    if ((isAuthed && !isWatchlistLoading && !isPortfolioLoading) || !isAuthed) {
      RNBootSplash.hide({ fade: true })
    }
  }, [isWatchlistLoading, isAuthed, isPortfolioLoading])

  if (!isAuthed) {
    return <AuthStack />
  }

  return (
    <View style={container}>
      <StatusBar barStyle="light-content" />
      <MainStack />
    </View>
  )
}

const container = {
  flex: 1,
  backgroundColor: BACKGROUND,
}
