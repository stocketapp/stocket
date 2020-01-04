// @flow
import React, { useMemo } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Container, Text } from 'components'
import type { TradeInfoProps } from 'types'
import { useSelector } from 'react-redux'
import { GRAY_DARKER, GREEN } from 'utils/colors'
import { formatCurrency } from 'utils/functions'
import StockDetails from './StockDetails'
import { createTrade } from 'api'

export default function TradeInfo({ data, loading }: TradeInfoProps) {
  const price = data?.price
  const { uid } = useSelector(({ user }) => user.currentUser)
  const { stockQuantity, selectedTradeAction } = useSelector(
    ({ trade }) => trade,
  )
  const orderValue = useMemo(() => {
    const total = (parseFloat(price) || 0) * stockQuantity
    return formatCurrency(total)
  }, [stockQuantity, price])

  const createTradeTransaction = () => {
    createTrade(uid, {
      value: parseFloat(orderValue),
      price: parseFloat(data?.price),
      name: data?.name,
      symbol: data?.symbol,
      quantity: stockQuantity,
      action: selectedTradeAction,
    })
  }

  return (
    <Container ph>
      {data && (
        <Container top={40}>
          <Container horizontal separate>
            <Container>
              <Text type="title">{data?.name}</Text>
              <Text type="subtitle" style={styles.symbol} color={GRAY_DARKER}>
                {data?.symbol}
              </Text>
            </Container>
          </Container>

          <StockDetails data={data} />

          <View style={styles.bottom}>
            <Text type="title">Order value: {orderValue}</Text>

            <View
              style={[
                styles.btnContainer,
                { opacity: !stockQuantity ? 0.5 : 1 },
              ]}
            >
              <TouchableOpacity
                style={[styles.btn]}
                disabled={!stockQuantity}
                onPress={createTradeTransaction}
              >
                <Text
                  type="title"
                  style={{ fontWeight: '800', letterSpacing: 0.7 }}
                >
                  {selectedTradeAction === 'BUY' ? 'BUY' : 'SELL'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Container>
      )}
    </Container>
  )
}

const styles = {
  symbol: {
    marginTop: 5,
  },
  btnContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 60,
  },
  btn: {
    width: '100%',
    backgroundColor: GREEN,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 4,
  },
  bottom: {
    alignItems: 'flex-end',
    width: '100%',
    marginTop: 30,
    height: '100%',
    bottom: 0,
  },
}
