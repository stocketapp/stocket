import { Container, Text } from '@components'
import { useQuery } from '@apollo/client'
import { FlatList, useWindowDimensions } from 'react-native'
import { PURCHASE_HISTORY } from './queries'
import { Item } from './styles'
import { getProductValue, formatCurrency } from '@utils/functions'
import theme from '@theme'
import moment from 'moment'

export default function PurchasesHistory() {
  const { data } = useQuery<{ purchases: PurchaseType[] }>(PURCHASE_HISTORY)
  const { width } = useWindowDimensions()

  const renderItem = ({ sku, price, createdAt }: PurchaseType) => (
    <Item>
      <Text weight="Semibold" style={{ width: 140 }}>
        {formatCurrency(getProductValue(sku)?.value ?? 0)}
      </Text>
      <Text weight="Semibold">{formatCurrency(price)}</Text>
      <Text color="GRAY" weight="Regular">
        {moment(createdAt).format('L')}
      </Text>
    </Item>
  )

  return (
    <Container fullView>
      <FlatList
        data={data?.purchases}
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
  sku: string
  purchaseId: string
  price: number
  id: string
  createdAt: string
}
