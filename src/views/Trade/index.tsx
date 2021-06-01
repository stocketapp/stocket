import { useMemo } from 'react'
import { TradeContentContainer, quantityContainer, HStack } from './styles'
import { IEXQuote } from 'types'
import { VStack, purchaseDetails } from './styles'
import { Text } from '@components'
import { useState } from 'react'
import TradeModalHeader from './TradeModalHeader'
import { userVar } from '@cache'
import { useReactiveVar } from '@apollo/client'
import TradeModalKeyboard from './TradeModalKeyboard'
import { RouteProp, useRoute } from '@react-navigation/native'
import { TradeStackParamList } from 'navigation/stacks/TradeStack'

export default function Trade({ quote }: StockTradeModalProps) {
  const [quantity, setQuantity] = useState('0')
  const user = useReactiveVar(userVar)
  const { params } = useRoute<RouteProp<TradeStackParamList, 'TradeModal'>>()

  const cash = user?.cash || 0
  const maxShares = useMemo(() => (cash / quote?.latestPrice).toFixed(2), [
    cash,
    quote?.latestPrice,
  ])

  const onKeyPress = (value: string) => {
    setQuantity(value)
  }

  return (
    <TradeContentContainer>
      <TradeModalHeader name={params?.companyName} logo={params?.logo} price={0} />

      <VStack style={purchaseDetails}>
        <HStack style={quantityContainer}>
          <Text type="huge">{(Number(quantity) || 0).toLocaleString('en-US')}</Text>
        </HStack>
        <HStack style={quantityContainer}>
          <Text type="subtext" color="LIGHT_GRAY" weight="Semibold">
            Max: {maxShares}
          </Text>
        </HStack>
      </VStack>

      <TradeModalKeyboard onKeyPress={onKeyPress} />
    </TradeContentContainer>
  )
}

type StockTradeModalProps = {
  quote: IEXQuote
  route: RouteProp<TradeStackParamList, 'TradeModal'>
}
