import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { useDispatchAction } from '@hooks'

export default function useRemoveFromWatchlist() {
  const dispatch = useDispatchAction()
  const onCompleted = useCallback(removeFromStore, [dispatch])
  const [mutate] = useMutation(REMOVE_FROM_WATCHLIST, { onCompleted })
  const removeFromWatchlist = useCallback(remove, [mutate])

  function removeFromStore(data: any) {
    dispatch('REMOVE_FROM_WATCHLIST', data?.removeFromWatchlist?.symbol)
  }

  function remove(sym: string) {
    return mutate({
      variables: { input: { symbol: sym } },
    })
  }

  return removeFromWatchlist
}

const REMOVE_FROM_WATCHLIST = gql`
  mutation RemoveFromWatchlist($input: RemoveFromWatchlistInput!) {
    removeFromWatchlist(input: $input) {
      symbol
    }
  }
`
