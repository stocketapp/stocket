import { Container, Text } from '@components'
import { GET_POSITION } from '../queries'
import { useQuery } from '@apollo/client'
import { RouteProp, useRoute } from '@react-navigation/native'
import { StockStackParamsList } from 'navigation/stacks/StockStack'
import { useFocusEffect } from '@react-navigation/core'
import { useCallback } from 'react'
import { PositionType } from 'types'

export default function StockPositionTab({ activeTab }: StockPositionTabProps) {
  const { params } = useRoute<RouteProp<StockStackParamsList, 'Stock'>>()
  const { data, refetch } = useQuery(GET_POSITION, {
    variables: { symbol: params?.symbol },
  })
  const position = data?.position

  useFocusEffect(
    useCallback(() => {
      const refetchInterval = setInterval(async () => {
        if (activeTab === 1) {
          await refetch()
        }
      }, 15000)

      return () => clearInterval(refetchInterval)
    }, [activeTab, refetch]),
  )

  return (
    <Container fullView>
      <Text>{position?.totalValue}</Text>
    </Container>
  )
}

interface StockPositionTabProps {
  activeTab: number
  position: PositionType
}
