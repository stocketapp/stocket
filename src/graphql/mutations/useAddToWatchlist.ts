import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { useDispatchAction } from '@hooks'

export default function useAddToWatchlist() {
  const dispatch = useDispatchAction()
  const onCompleted = useCallback(addToStore, [dispatch])
  const [mutate] = useMutation(ADD_TO_WATCHLIST_MUTATION, { onCompleted })
  const addToWatchlist = useCallback(add, [mutate])

  function addToStore(data: any) {
    dispatch('ADD_TO_WATCHLIST', data?.createWatchlist)
  }

  function add(symbol: string) {
    return mutate({
      variables: { input: { symbol } },
    })
  }

  return addToWatchlist
}

const ADD_TO_WATCHLIST_MUTATION = gql`
  mutation AddToWatchlist($input: CreateWatchlistInput!) {
    createWatchlist(input: $input) {
      change
      changePercent
      close
      closeTime
      companyName
      high
      iexRealtimePrice
      latestPrice
      low
      marketCap
      open
      openTime
      peRatio
      symbol
      week52High
      week52Low
      ytdChange
    }
  }
`
