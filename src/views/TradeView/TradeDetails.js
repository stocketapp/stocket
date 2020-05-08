// @flow
import React from 'react'
import { View } from 'react-native'
import { Text } from 'components'
import { LABEL, GRAY_DARKER } from 'utils/colors'
import { formatCurrency } from 'utils/functions'

type TradeDetailProps = {
  label: string,
  value: string | number,
}

const TradeDetail = ({ label, value }: TradeDetailProps) => (
  <View style={styles.detail}>
    <Text type="title" weight="300" color={LABEL}>
      {label}
    </Text>
    <Text weight="bold" type="title">
      {value}
    </Text>
  </View>
)

type TradeDetailsProps = {
  selectedStock: { price: string },
  quantity: string | number,
}

export default ({ selectedStock, quantity }: TradeDetailsProps) => {
  return (
    <View style={{ paddingTop: 40 }}>
      <TradeDetail label="Price" value={formatCurrency(selectedStock?.price)} />
      <TradeDetail label="Shares" value={quantity} />
    </View>
  )
}

const styles = {
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 14,
    borderBottomWidth: 0.2,
    borderBottomColor: GRAY_DARKER,
    paddingTop: 50,
  },
}
