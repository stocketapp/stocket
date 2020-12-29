import { gql, QueryResult } from '@apollo/client'
import { useQuery } from '@apollo/client'
import { IexQuote } from 'types'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

interface WatchlistResult extends QueryResult {
  data: Array<IexQuote>
}

export default function useGetWatchlist(): WatchlistResult {
  const dispatch = useDispatch()
  const {
    data: { getWatchlist },
    ...rest
  } = useQuery(GET_WATCHLIST_QUERY)

  useEffect(() => {
    if (getWatchlist) {
      dispatch({
        type: 'SET_WATCHLIST',
        watchlist: getWatchlist,
      })
    }
  }, [getWatchlist, dispatch])

  return { data: getWatchlist, ...rest }
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
