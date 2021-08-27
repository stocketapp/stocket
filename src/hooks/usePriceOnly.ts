import { gql, useQuery } from '@apollo/client'
import { useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'

export default function usePriceOnly(symbol: string, interval = 0) {
  const { data, error, loading, startPolling, stopPolling } = useQuery(GET_PRICE_QUERY, {
    variables: { symbol },
  })

  useFocusEffect(
    useCallback(() => {
      startPolling(interval)
      return () => stopPolling
    }, [interval, startPolling, stopPolling]),
  )

  return { price: data?.price, error, loading }
}

const GET_PRICE_QUERY = gql`
  query ($symbol: String!) {
    price(symbol: $symbol)
  }
`
