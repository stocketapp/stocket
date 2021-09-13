import { gql } from '@apollo/client'

export const PURCHASE_HISTORY = gql`
  query {
    purchases {
      id
      sku
      price
      createdAt
      purchaseId
    }
  }
`
