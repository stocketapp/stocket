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
    <Text type="title" weight="Thin" color={LABEL}>
      {label}
    </Text>
    <Text weight="Black" type="title">
      {value}
    </Text>
  </View>
)

type TradeDetailsProps = {
  quantity: string | number,
  maxShares: number,
  isSell: string,
  owned: number,
  price: number,
}

export default ({
  quantity,
  maxShares,
  isSell,
  owned,
  price,
}: TradeDetailsProps) => {
  const sharesAmountLabel = isSell ? 'Max' : 'Owned'
  const sharesAmount = isSell ? (maxShares >= 0 ? maxShares : '0') : owned
  return (
    <View style={{ paddingTop: '3%' }}>
      <TradeDetail label="Price" value={formatCurrency(price)} />
      <TradeDetail label="Shares" value={quantity} />

      <View style={styles.maxSharesContainer}>
        <Text type="subtext" color={GRAY_DARKER} weight="Medium">
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
    paddingBottom: '3%',
    borderBottomWidth: 0.2,
    borderBottomColor: GRAY_DARKER,
    paddingTop: '9%',
  },
  maxSharesContainer: {
    width: '100%',
    alignItems: 'flex-end',
    height: 30,
    justifyContent: 'center',
  },
}
