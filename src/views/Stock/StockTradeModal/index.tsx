import { Dispatch, SetStateAction, useMemo } from 'react'
import { Modal, TouchableWithoutFeedback } from 'react-native'
import {
  TradeContentContainer,
  ButtonTrade,
  quantityContainer,
  HStack,
  totalContainerStyles,
} from './styles'
import { IEXQuote } from 'types'
import { VStack, purchaseDetails } from './styles'
import { Text, VirtualNumPad } from '@components'
import { useState } from 'react'
import { useTheme } from '@emotion/react'
import Company from './Company'
import { formatCurrency } from '@utils/functions'
import { userVar } from '@cache'
import { useReactiveVar } from '@apollo/client'

function StockTradeModal({ quote, visible, setVisible }: StockTradeModalProps) {
  const [quantity, setQuantity] = useState('0')
  const theme = useTheme()
  const user = useReactiveVar(userVar)
  const total = useMemo(() => Number(quantity) * quote?.latestPrice, [
    quantity,
    quote?.latestPrice,
  ])
  const cash = user?.cash || 0
  const maxShares = useMemo(() => (cash / quote?.latestPrice).toFixed(2), [
    cash,
    quote?.latestPrice,
  ])

  const numPadRemove = () => {
    if (quantity === '') {
      setQuantity(() => quantity.concat(''))
    }
    setQuantity(() => quantity.slice(0, -1))
  }

  const onNumPadPress = (str: string) => {
    if (quantity === '' && str === '.') {
      setQuantity('0.')
    } else {
      setQuantity(() => {
        if (str === '.' && quantity.includes('.')) {
          return quantity
        } else {
          return quantity.concat(str).replace(/^0/g, '')
        }
      })
    }
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
          <Company
            name={quote?.companyName}
            logo={quote?.logo}
            price={quote?.latestPrice}
          />

          <VStack style={purchaseDetails}>
            <HStack style={quantityContainer}>
              <Text type="huge">{quantity}</Text>
            </HStack>
            <HStack style={quantityContainer}>
              <Text type="subtext" color="LIGHT_GRAY" weight="Semibold">
                Max: {maxShares}
              </Text>
            </HStack>

            <HStack style={totalContainerStyles}>
              <Text type="title" weight="Medium" color="LIGHT_GRAY">
                Total
              </Text>
              <Text type="heading" weight="Bold">
                {formatCurrency(total || 0)}
              </Text>
            </HStack>
            <ButtonTrade style={{ backgroundColor: theme.colors.GREEN }}>
              <Text type="heading" weight="Bold">
                Buy
              </Text>
            </ButtonTrade>
          </VStack>
          <VirtualNumPad onKeyPress={onNumPadPress} onDelete={numPadRemove} />
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
