import { forwardRef, MutableRefObject } from 'react'
import RBSheet from 'react-native-raw-bottom-sheet'
import { Dimensions } from 'react-native'
import { tradeViewcContainerStyles, TradeContentContainer } from './styles'
import { IEXQuote } from 'types'
import { TradedStockVContainer, purchaseDetails } from './styles'
import { Text, Input } from '@components'
import { useState } from 'react'
import { useTheme } from '@emotion/react'
import Company from './Company'

function StockTradeModal({ forwardedRef, quote }: StockTradeModalProps) {
  const [quantity, setQuantity] = useState('')
  const { colors } = useTheme()

  return (
    <RBSheet
      height={Dimensions.get('window').height - 80}
      customStyles={{ container: tradeViewcContainerStyles }}
      ref={forwardedRef}
      closeOnDragDown
    >
      <TradeContentContainer>
        <Company
          name={quote?.companyName}
          logo={quote?.logo}
          price={quote?.latestPrice}
        />

        <TradedStockVContainer style={purchaseDetails}>
          <Text type="label" color={colors.GRAY}>
            Balance
          </Text>
          <Text type="heading" weight="Bold">
            $2,428.78
          </Text>
          <Input
            value={quantity}
            setValue={setQuantity}
            placeholder="Quantity"
            keyboardType="numbers-and-punctuation"
          />
        </TradedStockVContainer>
      </TradeContentContainer>
    </RBSheet>
  )
}

interface StockTradeModalProps {
  forwardedRef: any
  ref: MutableRefObject<RBSheet | undefined>
  quote: IEXQuote
}

export default forwardRef((props: any, forwardedRef: any) =>
  StockTradeModal({ forwardedRef, ...props }),
)
