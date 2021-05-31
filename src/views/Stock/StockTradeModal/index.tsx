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
import { useRoute } from '@react-navigation/native'

function StockTradeModal({ quote }: StockTradeModalProps) {
  const [quantity, setQuantity] = useState('0')
  const user = useReactiveVar(userVar)
  const route = useRoute()

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
      <TradeModalHeader
        name={quote?.companyName}
        logo={quote?.logo}
        price={quote?.latestPrice}
      />

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

interface StockTradeModalProps {
  quote: IEXQuote
}

export default StockTradeModal
