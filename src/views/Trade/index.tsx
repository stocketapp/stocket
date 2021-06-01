import { useMemo, useState } from 'react'
import { TradeContentContainer, quantityContainer, HStack } from './styles'
import { VStack, purchaseDetails } from './styles'
import { Text } from '@components'
import TradeModalHeader from './TradeModalHeader'
import { userVar } from '@cache'
import { useReactiveVar } from '@apollo/client'
import TradeModalKeyboard from './TradeModalKeyboard'
import { RouteProp, useRoute } from '@react-navigation/native'
import { TradeStackParamList } from 'navigation/stacks/TradeStack'
import { usePriceOnly } from '@hooks'

export default function Trade() {
  const [quantity, setQuantity] = useState('0')
  const user = useReactiveVar(userVar)
  const { params } = useRoute<RouteProp<TradeStackParamList, 'TradeModal'>>()
  const { price } = usePriceOnly(params?.symbol, 15000)

  const cash = user?.cash || 0
  const maxShares = useMemo(() => (cash / price).toFixed(2), [cash, price])

  const onKeyPress = (value: string) => {
    setQuantity(value)
  }

  return (
    <TradeContentContainer>
      <TradeModalHeader name={params?.companyName} logo={params?.logo} price={price} />

      <VStack style={purchaseDetails}>
        <HStack style={quantityContainer}>
          <Text type="huge">{(Number(quantity) || 0).toLocaleString('en-US')}</Text>
        </HStack>
        <HStack style={quantityContainer}>
          <Text type="subtext" color="LIGHT_GRAY" weight="Semibold">
            Max {maxShares}
          </Text>
        </HStack>
      </VStack>

      <TradeModalKeyboard onKeyPress={onKeyPress} />
    </TradeContentContainer>
  )
}
