import { Dispatch, SetStateAction, useMemo } from 'react'
import { Modal, TouchableWithoutFeedback } from 'react-native'
import { TradeContentContainer, quantityContainer, HStack } from './styles'
import { IEXQuote } from 'types'
import { VStack, purchaseDetails } from './styles'
import { Text } from '@components'
import { useState } from 'react'
import TradeModalHeader from './TradeModalHeader'
import { userVar } from '@cache'
import { useReactiveVar } from '@apollo/client'
import TradeModalKeyboard from './TradeModalKeyboard'

function StockTradeModal({ quote, visible, setVisible }: StockTradeModalProps) {
  const [quantity, setQuantity] = useState('0')
  const user = useReactiveVar(userVar)

  const cash = user?.cash || 0
  const maxShares = useMemo(() => (cash / quote?.latestPrice).toFixed(2), [
    cash,
    quote?.latestPrice,
  ])

  const onKeyPress = (value: string) => {
    setQuantity(value)
  }

  return (
    <Modal
      visible={visible}
      presentationStyle="formSheet"
      onDismiss={() => setVisible(false)}
      onRequestClose={() => setVisible(false)}
      animationType="slide"
    >
      <TouchableWithoutFeedback onPressOut={() => setVisible(false)}>
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
      </TouchableWithoutFeedback>
    </Modal>
  )
}

interface StockTradeModalProps {
  quote: IEXQuote
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}

export default StockTradeModal
