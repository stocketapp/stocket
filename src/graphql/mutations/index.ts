import useCreateUserMutation from './useCreateUserMutation'
import { gql } from '@apollo/client'

export default function useStocketMutation() {
  const createUser = useCreateUserMutation()
  return {
    createUser,
  }
}

export const CREATE_WATCHLIST = gql`
  mutation CreateWatchlist($input: CreateWatchlistInput!) {
    createWatchlist(input: $input) {
      symbol
    }
  }
`
