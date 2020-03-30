// @flow
import React from 'react'
import { View } from 'react-native'
import { Text } from 'components'
import { GRAY_DARKER } from 'utils/colors'
import numeral from 'numeral'

type DetailItemProps = {
  label: string,
  value: string,
}

const StockDetailItem = ({ label, value }: DetailItemProps): React$Node => (
  <View style={styles.detailItemContainer}>
    <Text color={GRAY_DARKER} style={{ fontSize: 13 }}>
      {label}
    </Text>
    <Text weight="700">{value}</Text>
  </View>
)

type StockDetailsProps = {
  data: {
    price_open: string,
    day_high: string,
    day_low: string,
    volume: string,
    market_cap: string,
    eps: string,
    '52_week_high': string,
    '52_week_low': string,
  },
}

export default ({ data }: StockDetailsProps): React$Node => (
  <View style={styles.container}>
    <View style={{ width: '48%' }}>
      <StockDetailItem label="Open" value={data?.price_open} />
      <StockDetailItem label="High" value={data?.day_high} />
      <StockDetailItem label="Low" value={data?.day_low} />
      <StockDetailItem
        label="Vol"
        value={numeral(data?.volume).format('0.00a')}
      />
    </View>
    <View style={{ width: '48%', paddingLeft: 15 }}>
      <StockDetailItem label="52W H" value={data['52_week_high']} />
      <StockDetailItem label="52W L" value={data['52_week_low']} />
      <StockDetailItem
        label="Mkt Cap"
        value={numeral(data?.market_cap).format('0.00a')}
      />
      <StockDetailItem label="EPS" value={data?.eps} />
    </View>
  </View>
)

const styles = {
  container: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 1,
    alignItems: 'center',
  },
}
