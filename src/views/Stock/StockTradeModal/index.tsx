import { Dispatch, SetStateAction, useMemo } from 'react'
import { Modal, TouchableWithoutFeedback } from 'react-native'
import { TradeContentContainer, totalContainerStyles, ButtonBuy } from './styles'
import { IEXQuote } from 'types'
import { VStack, purchaseDetails } from './styles'
import { Text, Input } from '@components'
import { useState } from 'react'
import { useTheme } from '@emotion/react'
import Company from './Company'
import { formatCurrency } from '@utils/functions'
import { userVar } from '@cache'
import { useReactiveVar } from '@apollo/client'
import AccountBalance from './AccountBalance'

function StockTradeModal({ quote, visible, setVisible }: StockTradeModalProps) {
  const [quantity, setQuantity] = useState('')
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
            <AccountBalance balance={cash} theme={theme} />
            <Input
              value={quantity}
              setValue={setQuantity}
              placeholder="Shares"
              keyboardType="decimal-pad"
              containerStyle={{ marginVertical: theme.p.huge }}
            />
            <Text color="GRAY" type="subtext" weight="Medium">
              Max {maxShares}
            </Text>

            <VStack style={totalContainerStyles}>
              <Text type="title" color="GRAY">
                Total
              </Text>
              <Text style={{ paddingTop: theme.p.md }} type="heading" weight="Bold">
                {formatCurrency(total)}
              </Text>
            </VStack>
            <ButtonBuy>
              <Text type="heading" weight="Bold">
                Buy
              </Text>
            </ButtonBuy>
          </VStack>
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
