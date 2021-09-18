import { gql } from '@apollo/client'

export const TRADE_HISTORY = gql`
  query Trades {
    trades {
      createdAt
      symbol
      id
      total
      size
      price
      total
    }
  }
`
