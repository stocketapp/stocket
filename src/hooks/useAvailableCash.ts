import { gql, useQuery } from '@apollo/client'
import { useCallback, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { balanceVar } from '@cache'

export default function useAvailableCash() {
  const { data, refetch, ...result } = useQuery(GET_BALANCE_QUERY, {
    fetchPolicy: 'network-only',
  })

  useFocusEffect(
    useCallback(() => {
      refetch()
    }, [refetch]),
  )

  useEffect(() => {
    if (!result?.error) {
      balanceVar(data?.balance?.cash)
    }
  }, [data?.balance?.cash, result?.error])

  return { cash: data?.balance?.cash, ...result }
}

const GET_BALANCE_QUERY = gql`
  query {
    balance {
      cash
    }
  }
`
