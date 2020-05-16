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
    <Text type="title" weight="400" color={LABEL}>
      {label}
    </Text>
    <Text weight="900" type="title">
      {value}
    </Text>
  </View>
)

type TradeDetailsProps = {
  selectedStock: { price: string },
  quantity: string | number,
  maxShares: number,
  isSell: string,
  owned: number,
}

export default ({
  selectedStock,
  quantity,
  maxShares,
  isSell,
  owned,
}: TradeDetailsProps) => {
  const sharesAmountLabel = isSell ? 'Max' : 'Owned'
  const sharesAmount = isSell ? (maxShares >= 0 ? maxShares : '0') : owned
  return (
    <View style={{ paddingTop: 10 }}>
      <TradeDetail label="Price" value={formatCurrency(selectedStock?.price)} />
      <TradeDetail label="Shares" value={quantity} />

      <View style={styles.maxSharesContainer}>
        <Text type="subtext" color={GRAY_DARKER} weight="700">
          {sharesAmountLabel} {sharesAmount}
        </Text>
      </View>
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
  maxSharesContainer: {
    width: '100%',
    alignItems: 'flex-end',
    height: 30,
    justifyContent: 'center',
  },
}
