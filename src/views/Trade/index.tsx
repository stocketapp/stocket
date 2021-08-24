import { useMemo, useState } from 'react'
import { Text, Container } from '@components'
import { userVar } from '@cache'
import { useReactiveVar } from '@apollo/client'
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native'
import { TradeStackParamsList } from 'navigation/stacks/TradeStack'
import { usePriceOnly } from '@hooks'
import TradeModalHeader from './TradeModalHeader'
import TradeModalKeyboard from './TradeModalKeyboard'
import TradeAccountBalance from './TradeAccountBalance'
import { quantityContainer, HStack } from './styles'
import { useTheme } from '@emotion/react'
import { StockNavigationProps } from 'navigation/stacks/StockStack'

export default function Trade() {
  const [quantity, setQuantity] = useState('0')
  const user = useReactiveVar(userVar)
  const { params } = useRoute<RouteProp<TradeStackParamsList, 'TradeModal'>>()
  const { price } = usePriceOnly(params?.symbol, 15000)
  const { navigate } = useNavigation<StockNavigationProps>()
  const { colors, p } = useTheme()

  const cash = user?.cash || 0
  const maxShares = useMemo(
    () => (cash / price || params?.price).toFixed(2),
    [cash, params?.price, price],
  )
  const total = useMemo(() => price * Number(quantity), [price, quantity])
  const totalOwned = useMemo(
    () => price * (params?.ownedShares ?? 0),
    [params?.ownedShares, price],
  )
  const orderType = params?.orderType
  const isOrderTypeSell = useMemo(() => orderType === 'SELL', [orderType])

  const onKeyPress = (value: string) => {
    setQuantity(value)
  }

  const goToReview = () => {
    navigate('TradeStack', {
      screen: 'TradeModalReview',
      params: { total, quantity: Number(quantity), ...params },
    })
  }

  return (
    <Container
      fullView
      separate
      bgColor={colors.BG_DARK_CARD}
      safeAreaBottom
      top={p.xxlg}
    >
      <TradeModalHeader
        name={params?.companyName}
        logo={params?.logo}
        price={price || params?.price}
      />

      <HStack style={quantityContainer}>
        <Text type="huge">{quantity}</Text>
      </HStack>

      <TradeAccountBalance
        balance={isOrderTypeSell ? totalOwned : cash}
        maxShares={isOrderTypeSell ? params?.ownedShares : maxShares}
        isOrderTypeSell={isOrderTypeSell}
      />

      <TradeModalKeyboard
        onKeyPress={onKeyPress}
        orderType={orderType}
        onBtnPress={goToReview}
        btnDisabled={Number(quantity) <= 0}
      />
    </Container>
  )
}
