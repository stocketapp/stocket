import { gql } from '@apollo/client'

export const ADD_CASH = gql`
  mutation AddCash($input: AddCashInput!) {
    addCash(input: $input) {
      cash
    }
  }
`
