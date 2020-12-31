import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { useCallback } from 'react'

type AddToWatchlistInput = {
  symbol: string
}

export default function useAddToWatchlist() {
  const [mutation] = useMutation(ADD_TO_WATCHLIST_MUTATION)

  const addToWatchlist = useCallback(
    (symbol: string) => {
      return mutation({
        variables: { input: { symbol } },
      })
    },
    [mutation],
  )

  return addToWatchlist
}

const ADD_TO_WATCHLIST_MUTATION = gql`
  mutation AddToWatchlist($input: CreateWatchlistInput!) {
    createWatchlist(input: $input) {
      symbol
    }
  }
`
