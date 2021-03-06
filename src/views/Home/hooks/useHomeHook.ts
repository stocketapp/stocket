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
    const watchlist = watchlistData?.watchlist
    portfolioValueVar(balanceData?.portfolioValue)
    watchlistQuotesVar(watchlist?.quotes)

    watchlistQuotesVar(watchlist?.quotes)
    watchlistSymbolsVar(watchlist?.symbols)
  }, [balanceData?.portfolioValue, watchlistData?.watchlist])

  useEffect(() => {
    isWatchlistLoadingVar(watchlistLoading)
    isPortfolioValueLoadingVar(balanceLoading)
  }, [balanceLoading, watchlistLoading])

  useFocusEffect(
    useCallback(() => {
      let refetchInterval = setInterval(async () => {
        await refetchWatchlist()
        await refetchBalance()
      }, 10000)

      return () => clearInterval(refetchInterval)
    }, [refetchWatchlist, refetchBalance]),
  )

  return { invested: portfolioValue, watchlist: watchlistQuotes }
}
