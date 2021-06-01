import { gql, useQuery } from '@apollo/client'
import { useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'

export default function useBalance(interval = 0) {
  const { data, startPolling, stopPolling, ...result } = useQuery(GET_BALANCE_QUERY)

  useFocusEffect(
    useCallback(() => {
      startPolling(interval)
      return () => stopPolling()
    }, [interval, startPolling, stopPolling]),
  )

  return { data: data?.user, ...result }
}

const GET_BALANCE_QUERY = gql`
  query {
    user {
      portfolioValue
      cash
    }
  }
`
