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

export default function TradeInfo({ loading }: TradeInfoProps) {
  const { uid } = useSelector(({ user }) => user.currentUser)
  const {
    stockQuantity,
    selectedTradeAction,
    maxShares,
    tradeData: data,
    sharesOwned,
  } = useSelector(({ trade }) => trade)
  const price = data?.price
  const orderValue = useMemo(() => {
    const total = (parseFloat(price) || 0) * stockQuantity
    return total
  }, [stockQuantity, price])

  const createTradeTransaction = () => {
    createTrade(uid, {
      value: orderValue,
      price: parseFloat(data?.price),
      name: data?.name,
      symbol: data?.symbol,
      quantity: parseInt(stockQuantity, 10),
      action: selectedTradeAction,
    })
  }

  const btnDisabled = useMemo(() => {
    return (
      stockQuantity &&
      (selectedTradeAction === 'BUY'
        ? stockQuantity <= maxShares
        : stockQuantity <= sharesOwned)
    )
  }, [stockQuantity, selectedTradeAction, maxShares, sharesOwned])

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
            <Text type="title">Order value: {formatCurrency(orderValue)}</Text>

            <View
              style={[styles.btnContainer, { opacity: !btnDisabled ? 0.5 : 1 }]}
            >
              <TouchableOpacity
                style={[styles.btn]}
                disabled={!btnDisabled}
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
