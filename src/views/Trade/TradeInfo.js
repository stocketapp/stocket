// @flow
import React, { useMemo } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Container, Text, Label } from 'components'
import type { TradeInfoProps } from 'types'
import { useSelector } from 'react-redux'
import { GRAY_DARKER, GREEN } from 'utils/colors'
import { formatCurrency } from 'utils/functions'
import TradeAction from './TradeAction'
import StockQuantity from './StockQuantity'

export default function TradeInfo({ data, loading }: TradeInfoProps) {
  const status = parseFloat(data?.change_pct) > 0 ? 'positive' : 'negative'
  const { stockQuantity } = useSelector(({ trade }) => trade)
  const price = data?.price

  const orderValue = useMemo(() => {
    const total = (parseFloat(price) || 0) * stockQuantity
    return formatCurrency(total)
  }, [stockQuantity, price])

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

          <Container width="100%">
            <Container horizontal separate width="100%" top={15}>
              <Label title="Price" value={formatCurrency(price)} />

              <Label title="Change" style={styles.label}>
                <Container horizontal width="100%">
                  <Text type="label" status={status}>
                    {formatCurrency(data?.day_change)}{' '}
                  </Text>
                  <Text type="label" status={status}>
                    ({formatCurrency(data?.change_pct)}%)
                  </Text>
                </Container>
              </Label>
            </Container>

            <Container horizontal separate width="100%" top={15}>
              <Label title="EPS" value={formatCurrency(data?.eps)} />
              <Label
                title="Open"
                value={formatCurrency(data?.price_open)}
                style={styles.label}
              />
            </Container>
          </Container>

          <TradeAction />
          <StockQuantity />

          <View style={styles.bottom}>
            <Text type="title">Order value: {orderValue}</Text>

            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.btn}>
                <Text type="title">Done</Text>
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
  label: {
    paddingLeft: '15%',
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
    marginTop: 50,
    height: '100%',
    bottom: 0,
  },
}
