import { gql, useQuery } from '@apollo/client'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import { balanceVar } from '@cache'

export default function useBalance() {
  const res = useQuery<{ balance: BalanceType }>(BALANCE_QUERY, {
    onCompleted: (data: { balance: BalanceType }) => {
      balanceVar(data?.balance)
    },
  })

  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(() => res.refetch(), 15000)

      return () => clearInterval(interval)
    }, [res]),
  )

  return { balance: res.data?.balance, ...res }
}

export interface BalanceType {
  cash: number
  portfolio: number
  total: number
}

const BALANCE_QUERY = gql`
  query {
    balance {
      cash
      portfolio
      total
    }
  }
`
