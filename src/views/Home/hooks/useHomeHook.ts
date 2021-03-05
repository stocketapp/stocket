import { useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { USER_BALANCE_QUERY, WATCHLIST_QUERY } from '../queries'
import { useQuery, useReactiveVar } from '@apollo/client'
import {
  portfolioValueVar,
  isPortfolioValueLoadingVar,
  watchlistSymbolsVar,
  isWatchlistLoadingVar,
  watchlistQuotesVar,
} from '@cache'

export default function useHomeHook() {
  const { data: balanceData, loading: balanceLoading, refetch: refetchBalance } = useQuery(
    USER_BALANCE_QUERY,
  )
  const { data: watchlistData, loading: watchlistLoading, refetch: refetchWatchlist } = useQuery(
    WATCHLIST_QUERY,
  )
  const portfolioValue = balanceData?.portfolioValue
  const watchlistQuotes = useReactiveVar(watchlistQuotesVar)

  useEffect(() => {
    portfolioValueVar(balanceData?.portfolioValue)
    watchlistQuotesVar(watchlistData?.watchlist?.quotes)
  }, [balanceData?.portfolioValue, watchlistData?.watchlist?.quotes])

  useEffect(() => {
    isWatchlistLoadingVar(watchlistLoading)
    isPortfolioValueLoadingVar(balanceLoading)
  }, [balanceLoading, watchlistLoading])

  useFocusEffect(
    useCallback(() => {
      const watchlist = watchlistData?.watchlist
      let refetchInterval = setInterval(async () => {
        await refetchWatchlist()
        watchlistSymbolsVar(watchlist?.symbols)
        watchlistQuotesVar(watchlist?.quotes)
        await refetchBalance()
      }, 10000)

      return () => clearInterval(refetchInterval)
    }, [watchlistData?.watchlist, refetchWatchlist, refetchBalance]),
  )

  return { invested: portfolioValue, watchlist: watchlistQuotes }
}
