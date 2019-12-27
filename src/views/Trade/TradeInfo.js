// @flow
import React from 'react'
import { View } from 'react-native'
import { Container, Text, Label } from 'stocket-components'
import type { TradeInfoProps } from 'ComponentsTypes'
import { GRAY_DARKER } from 'utils/colors'
import TradeAction from './TradeAction'

export default function TradeInfo({ data, loading }: TradeInfoProps) {
  const status = parseFloat(data?.change_pct) > 0 ? 'positive' : 'negative'

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
              <Label title="Price" value={`$${data?.price}`} />

              <Label title="Change" style={styles.label}>
                <Container horizontal width="100%">
                  <Text type="label" status={status}>
                    ${`${data?.day_change} `}
                  </Text>
                  <Text type="label" status={status}>
                    ({`${data?.change_pct}`}%)
                  </Text>
                </Container>
              </Label>
            </Container>

            <Container horizontal separate width="100%" top={15}>
              <Label title="EPS" value={data?.eps} />
              <Label
                title="Open"
                value={data?.price_open}
                style={styles.label}
              />
            </Container>
          </Container>

          <TradeAction />
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
}
