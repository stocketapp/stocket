import { gql, QueryResult } from '@apollo/client'
import { useQuery } from '@apollo/client'
import { IexQuote } from 'types'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

export interface WatchlistResult extends QueryResult {
  data: Array<IexQuote>
}

export default function useGetWatchlist(): WatchlistResult {
  const dispatch = useDispatch()
  const { data, ...rest } = useQuery(GET_WATCHLIST_QUERY, { pollInterval: 5000 })
  const watchlist = data?.getWatchlist

  useEffect(() => {
    if (watchlist) {
      dispatch({
        type: 'SET_WATCHLIST',
        watchlist: watchlist,
      })
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
