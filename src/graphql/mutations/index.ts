import useCreateUserMutation from './useCreateUserMutation'
import { gql } from '@apollo/client'

export default function useStocketMutation() {
  const createUser = useCreateUserMutation()
  return {
    createUser,
  }
}

export const ADD_TO_WATCHLIST = gql`
  mutation($input: AddToWatchlistInput!) {
    addToWatchlist(input: $input) {
      symbol
      symbol
      change
      changePercent
      companyName
      latestPrice
      id
      logo
    }
  }
`

export const REMOVE_FROM_WATCHLIST = gql`
  mutation RemoveFromWatchlist($input: RemoveFromWatchlistInput!) {
    removeFromWatchlist(input: $input) {
      symbol
    }
  }
`
