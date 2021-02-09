import { gql } from '@apollo/client'

export const GET_WATCHLIST_QUERY = gql`
  query {
    getWatchlist {
      symbol
      change
      companyName
      changePercent
      ...WatchlistFieldsFragment
    }
  }
`
