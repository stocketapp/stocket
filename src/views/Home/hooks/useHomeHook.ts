import { useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { USER_BALANCE_QUERY, WATCHLIST_QUERY } from '../queries'
import { useQuery, useReactiveVar } from '@apollo/client'
import {
  portfolioValueVar,
  isPortfolioLoadingVar,
  watchlistSymbolsVar,
  isWatchlistLoadingVar,
  watchlistQuotesVar,
} from '@cache'
import { WatchlistIexQuote } from '../Watchlist/WatchlistItem'

export default function useHomeHook() {
  const { data: balanceData, loading: portfolioLoading, refetch: refetchPortfolio } = useQuery(
    USER_BALANCE_QUERY,
  )
  const { data: watchlistData, loading: watchlistLoading, refetch: refetchWatchlist } = useQuery(
    WATCHLIST_QUERY,
  )
  const portfolio = balanceData?.portfolio
  const watchlistQuotes = useReactiveVar(watchlistQuotesVar)

  useEffect(() => {
    const watchlist = watchlistData?.watchlist
    portfolioValueVar(balanceData?.portfolio)
    watchlistQuotesVar(watchlist?.quotes)

    watchlistQuotesVar(watchlist?.quotes)
    watchlistSymbolsVar(watchlist?.symbols)
  }, [balanceData?.portfolio, watchlistData?.watchlist])

  useEffect(() => {
    isWatchlistLoadingVar(watchlistLoading)
    isPortfolioLoadingVar(portfolioLoading)
  }, [portfolioLoading, watchlistLoading])

  useFocusEffect(
    useCallback(() => {
      let refetchInterval = setInterval(async () => {
        await refetchWatchlist()
        await refetchPortfolio()
      }, 15000)

      return () => clearInterval(refetchInterval)
    }, [refetchWatchlist, refetchPortfolio]),
  )

  return { portfolio, watchlist: watchlistQuotes }
}

export interface UseHomeHookObject {
  portfolio: PortfolioQueryType
  watchlist: [WatchlistIexQuote]
}

export interface PortfolioQueryType {
  value: number
  change: number
  changePct: number
  symbols: [String]
}
