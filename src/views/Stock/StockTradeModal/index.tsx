import { forwardRef, MutableRefObject, useMemo } from 'react'
import RBSheet from 'react-native-raw-bottom-sheet'
import { Dimensions } from 'react-native'
import {
  tradeViewcContainerStyles,
  TradeContentContainer,
  totalContainerStyles,
  ButtonBuy,
} from './styles'
import { IEXQuote } from 'types'
import { VStack, purchaseDetails } from './styles'
import { Text, Input } from '@components'
import { useState } from 'react'
import { useTheme } from '@emotion/react'
import Company from './Company'
import { formatCurrency } from '@utils/functions'
import { userVar } from '@cache'
import { useReactiveVar } from '@apollo/client'

function StockTradeModal({ forwardedRef, quote }: StockTradeModalProps) {
  const [quantity, setQuantity] = useState('')
  const { colors, p } = useTheme()
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

        <VStack style={purchaseDetails}>
          <Text type="title" color={colors.GRAY}>
            Account Balance
          </Text>
          <Text type="heading" weight="Bold" style={{ paddingTop: p.md }}>
            {formatCurrency(cash)}
          </Text>
          <Input
            value={quantity}
            setValue={setQuantity}
            placeholder="Shares"
            keyboardType="decimal-pad"
            containerStyle={{ marginVertical: p.huge }}
          />
          <Text color={colors.GRAY} type="subtext" weight="Medium">
            Max {maxShares}
          </Text>

          <VStack style={totalContainerStyles}>
            <Text type="title" color={colors.GRAY}>
              Total
            </Text>
            <Text style={{ paddingTop: p.md }} type="heading" weight="Bold">
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
