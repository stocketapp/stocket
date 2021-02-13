import { gql } from '@apollo/client'

export const WATCHLIST_QUERY = gql`
  query {
    watchlist {
      quotes {
        symbol
        change
        changePercent
        companyName
        latestPrice
        id
      }
      symbols
      watchlistSymbolsVar @client
      isWatchlistLoadingVar @client
    }
  }
`
