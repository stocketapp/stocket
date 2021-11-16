import { Container, Text } from '@components'
import { useQuery } from '@apollo/client'
import { FlatList, useWindowDimensions } from 'react-native'
import { formatCurrency } from '@utils/functions'
import theme from '@theme'
import moment from 'moment'
import { useFocusEffect } from '@react-navigation/core'
import { useCallback } from 'react'
import { TRADE_HISTORY } from './queries'
import { Item } from './styles'

export default function TradesHistory() {
  const { data, refetch } = useQuery<{ trades: PurchaseType[] }>(TRADE_HISTORY)
  const { width } = useWindowDimensions()

  useFocusEffect(
    useCallback(() => {
      refetch()
    }, [refetch]),
  )

  const renderItem = ({ symbol, price, createdAt, size }: PurchaseType) => (
    <Item>
      <Text weight="Semibold" style={{ width: 80 }}>
        {symbol}
      </Text>
      <Text weight="Semibold">
        {size} x {formatCurrency(price)}
      </Text>
      <Text color="GRAY" weight="Regular">
        {moment(createdAt).format('L')}
      </Text>
    </Item>
  )

  return (
    <Container fullView>
      <FlatList
        data={data?.trades}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{
          width,
          paddingHorizontal: theme.spacing.lg,
          paddingTop: theme.spacing.md,
        }}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  )
}

interface PurchaseType {
  createdAt: string
  symbol: string
  id: string
  total: number
  size: number
  price: number
}
