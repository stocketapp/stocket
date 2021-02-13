import React, { useEffect, useRef, ReactNode } from 'react'
import { StatusBar, View, AppState } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import messaging from '@react-native-firebase/messaging'
import RNBootSplash from 'react-native-bootsplash'
import {
  useAuthState,
  useSetUserInfo,
  useIapProducts,
  useSubscribeMarketHours,
  useSaveApnsToken,
} from './hooks'
import { BACKGROUND } from './utils/colors'
import TradeView from './views/TradeView'
import MainStack from './navigation/AppStack'
import AuthStack from './navigation/AuthenticationStack'
import crashlytics from '@react-native-firebase/crashlytics'
import { useQuery } from '@apollo/client'
import { WATCHLIST_QUERY } from '@queries'
import { watchlistSymbols, watchlistQuotes } from './Cache'

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage)
})

export default function App(): ReactNode {
  const { isAuth, currentUser } = useAuthState()
  const tradeViewRef = useRef()
  const { loading } = useSetUserInfo()
  useIapProducts(currentUser?.uid)
  useSaveApnsToken(currentUser?.uid)
  useSubscribeMarketHours()
  const { data: watchlistData, loading: isWatchlistLoading } = useQuery(WATCHLIST_QUERY, {
    pollInterval: 10000,
  })
  const watchlist = watchlistData?.watchlist

  useEffect(() => {
    if (!isWatchlistLoading) {
      watchlistQuotes(watchlist?.quotes)
      watchlistSymbols(watchlist?.symbols)
    }
  }, [watchlist, isWatchlistLoading])

  useEffect(() => {
    crashlytics().log('App Mounted')
    if (!loading && !isWatchlistLoading) {
      RNBootSplash.hide({ fade: true })
    }
  }, [loading, isWatchlistLoading])

  useEffect(() => {
    const requestNotificationPermission = async () => {
      await messaging().requestPermission()
    }
    requestNotificationPermission()
  }, [])

  useEffect(() => {
    const deleteCache = async (state: string) => {
      try {
        if (state === 'background') {
          await AsyncStorage.clear()
        }
      } catch (err) {
        console.log(err)
      }
    }
    AppState.addEventListener('change', deleteCache)

    return () => AppState.removeEventListener('change', deleteCache)
  }, [])

  if (!isAuth) {
    return <AuthStack />
  }

  return (
    <View style={container}>
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
