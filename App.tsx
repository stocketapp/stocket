import { useEffect, ReactNode } from 'react'
import { StatusBar, View } from 'react-native'
import RNBootSplash from 'react-native-bootsplash'
import { useAuthState, useIapInit } from './src/hooks'
import { BACKGROUND } from './src/utils/colors'
import MainStack from './src/navigation/AppStack'
import AuthStack from './src/navigation/AuthenticationStack'
import { useReactiveVar, useQuery } from '@apollo/client'
import { isWatchlistLoadingVar, isPortfolioLoadingVar } from './src/Cache'
import { MarketHoursContext } from './src/utils/context'
import { gql } from '@apollo/client'
import BugBattle from 'react-native-bugbattle-sdk'

export default function App(): ReactNode {
  const { isAuthed, user } = useAuthState()
  useIapInit(user?.uid)
  const isWatchlistLoading = useReactiveVar(isWatchlistLoadingVar)
  const isPortfolioLoading = useReactiveVar(isPortfolioLoadingVar)
  const { data, refetch } = useQuery(MARKET_HOURS)

  useEffect(() => {
    if ((isAuthed && !isWatchlistLoading && !isPortfolioLoading) || !isAuthed) {
      RNBootSplash.hide({ fade: true })
    }
  }, [isWatchlistLoading, isAuthed, isPortfolioLoading])

  useEffect(() => {
    const interval = setInterval(() => refetch(), 30000)

    return () => clearInterval(interval)
  }, [refetch])

  useEffect(() => {
    if (user?.uid) {
      BugBattle.setCustomerEmail(user?.email)
      BugBattle.setCustomerName(user?.displayName)
    }
  }, [user])

  if (!isAuthed) {
    return <AuthStack />
  }

  return (
    <MarketHoursContext.Provider value={data}>
      <View style={container}>
        <StatusBar barStyle="light-content" />
        <MainStack />
      </View>
    </MarketHoursContext.Provider>
  )
}

const MARKET_HOURS = gql`
  query MarketHours {
    marketHours
  }
`
const container = {
  flex: 1,
  backgroundColor: BACKGROUND,
}
