import { gql } from '@apollo/client'

export const CREATE_TRADE = gql`
  mutation CreateTrade($input: CreateTradeInput!) {
    createTrade(input: $input) {
      symbol
      total
      size
      price
    }
  }
`
