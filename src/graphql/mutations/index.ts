import useCreateUserMutation from './useCreateUserMutation'
import { gql } from '@apollo/client'

export default function useStocketMutation() {
  const createUser = useCreateUserMutation()
  return {
    createUser,
  }
}

export const ADD_TO_WATCHLIST = gql`
  mutation AddToWatchlist($input: AddToWatchlistInput!) {
    addToWatchlist(input: $input) {
      symbol
    }
  }
`

export const REMOVE_FROM_WATCHLIST = gql`
  mutation RemoveFromWatchlist($input: RemoveFromWatchlist!) {
    removeFromWatchlist(input: $input) {
      symbol
    }
  }
`
