import { gql } from '@apollo/client'

const IexQuoteFragment = gql`
  fragment IexQuoteFragment on WatchlistQuotes {
    quotes {
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

export const GET_WATCHLIST_QUERY = gql`
  query {
    watchlist {
      ...IexQuoteFragment
      symbols
    }
  }
  ${IexQuoteFragment}
`
