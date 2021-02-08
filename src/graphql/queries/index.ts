export * from './useGetUser'
import { gql } from '@apollo/client'

export const GET_WATCHLIST_QUERY = gql`
  query {
    getWatchlist {
      symbol
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
      week52Low
      week52High
      ytdChange
    }
  }
`

