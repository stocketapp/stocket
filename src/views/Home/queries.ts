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
        logo
      }
      symbols
    }
  }
`

export const USER_BALANCE_QUERY = gql`
  query {
    portfolioValue {
      value
    }
  }
`
