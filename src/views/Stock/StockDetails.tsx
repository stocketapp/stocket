// @flow
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@components'
import { GRAY_DARKER } from '@utils/colors'
import numeral from 'numeral'
import type { StockQuote } from 'types'

type DetailItemProps = {
  label: string
  value: string
}

const StockDetailItem = ({ label, value }: DetailItemProps) => (
  <View style={styles.detailItemContainer}>
    <Text color={GRAY_DARKER} style={{ fontSize: 13 }}>
      {label}
    </Text>
    <Text weight="Medium">{value}</Text>
  </View>
)

export default ({ data }: { data: StockQuote }) => (
  <View style={styles.container}>
    <View style={{ width: '48%' }}>
      <StockDetailItem label="Open" value={data?.open} />
      <StockDetailItem label="High" value={data?.high} />
      <StockDetailItem label="Low" value={data?.low} />
      <StockDetailItem label="Vol" value={numeral(data?.volume).format('0.00a')} />
    </View>
    <View style={{ width: '48%', paddingLeft: 15 }}>
      <StockDetailItem label="52W H" value={data?.week52High} />
      <StockDetailItem label="52W L" value={data?.week52Low} />
      <StockDetailItem label="Mkt Cap" value={numeral(data?.marketCap).format('0.00a')} />
      <StockDetailItem label="P/E Ratio" value={data?.peRatio} />
    </View>
  </View>
)

const styles = StyleSheet.create({
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
})
