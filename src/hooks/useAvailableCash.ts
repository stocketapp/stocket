import { gql, useQuery } from '@apollo/client'
import { useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { balanceVar } from '@cache'
import { BalanceType } from './useBalance'

export default function useAvailableCash() {
  const { data, refetch, ...result } = useQuery<{ balance: BalanceType }>(
    GET_BALANCE_QUERY,
    {
      fetchPolicy: 'network-only',
      onCompleted: (res: { balance: BalanceType }) => {
        balanceVar(res?.balance)
      },
    },
  )

  useFocusEffect(
    useCallback(() => {
      refetch()
    }, [refetch]),
  )

  return { cash: data?.balance?.cash ?? 0, ...result }
}

const GET_BALANCE_QUERY = gql`
  query {
    balance {
      cash
    }
  }
`
