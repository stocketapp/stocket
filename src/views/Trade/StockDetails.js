// @flow
import React from 'react'
import { Container, Text, Label } from 'components'
import type { TradeInfoProps } from 'types'
import { formatCurrency } from 'utils/functions'
import TradeAction from './TradeAction'
import StockQuantity from './StockQuantity'

export default function({ data }: TradeInfoProps): React$Node {
  const status = parseFloat(data?.change_pct) > 0 ? 'positive' : 'negative'
  const price = data?.price

  return (
    <>
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
    </>
  )
}

const styles = {
  label: {
    paddingLeft: '15%',
  },
}
