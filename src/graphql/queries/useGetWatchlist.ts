import { gql, QueryResult } from '@apollo/client'
import { IexQuote } from 'types'
import { useEffect } from 'react'
import { useRefetchQuery, useDispatchAction } from '@hooks'

export interface WatchlistResult extends QueryResult {
  data: Array<IexQuote>
}

export default function useGetWatchlist(): WatchlistResult {
  const dispatch = useDispatchAction()
  const { data, ...rest } = useRefetchQuery(GET_WATCHLIST_QUERY)
  const watchlist = data?.getWatchlist

  useEffect(() => {
    if (watchlist) {
      dispatch('SET_WATCHLIST', watchlist)
    }
  }, [watchlist, dispatch])

  return { data: watchlist, ...rest }
}

const GET_WATCHLIST_QUERY = gql`
  query {
    getWatchlist {
      change
      changePercent
      close
      closeTime
      companyName
      high
      iexRealtimePrice
      latestPrice
      low
      marketCap
      open
      openTime
      peRatio
      symbol
      week52High
      week52Low
      ytdChange
    }
  }
`
