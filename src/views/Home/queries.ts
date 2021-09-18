import { gql } from '@apollo/client'

export const WATCHLIST_QUERY = gql`
  query Watchlist {
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
  query Portfolio {
    portfolio {
      value
      change
      changePct
      positions {
        change24h
        change24hPct
        symbol
        logo
        size
        companyName
      }
    }
  }
`
