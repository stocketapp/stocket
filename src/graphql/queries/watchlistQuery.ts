import { gql } from '@apollo/client'

export const WATCHLIST_QUERY = gql`
  query {
    watchlist {
      symbols
      quotes {
        symbol
        change
        changePercent
        companyName
        id
        latestPrice
        logo
      }
    }
  }
`
