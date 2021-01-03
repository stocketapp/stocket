import { useState } from 'react'
import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { useDispatchAction } from '@hooks'

export default function useRemoveFromWatchlist() {
  const dispatch = useDispatchAction()
  const [symbol, setSymbol] = useState('')
  const onCompleted = useCallback(removeFromStore, [symbol, dispatch])
  const [mutate] = useMutation(REMOVE_FROM_WATCHLIST, { onCompleted })
  const removeFromWatchlist = useCallback(remove, [mutate])

  function removeFromStore() {
    dispatch('REMOVE_FROM_WATCHLIST', symbol)
  }

  function remove(sym: string) {
    setSymbol(sym)
    return mutate({
      variables: { input: { symbol: sym } },
    })
  }

  return removeFromWatchlist
}

const REMOVE_FROM_WATCHLIST = gql`
  mutation RemoveFromWatchlist($input: RemoveFromWatchlistInput!) {
    removeFromWatchlist(input: $input) {
      clientMutationId
    }
  }
`
