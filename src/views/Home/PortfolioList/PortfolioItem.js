// @flow
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { GRAY_DARKER } from 'utils/colors'
import { formatCurrency } from 'utils/functions'
import type { PositionType } from 'types'
import { Container, Text } from 'components'

const PortfolioItem = ({ item }: { item: PositionType }): React$Node => (
  <Container style={styles.container}>
    <View>
      <Text type="label">{item?.symbol}</Text>
      <Text type="subtext" color={GRAY_DARKER} style={styles.bottomRow}>
        {item?.name}
      </Text>
    </View>
    <View style={styles.right}>
      <Text type="label">{formatCurrency(item?.value)}</Text>
      <Text
        positive
        style={styles.bottomRow}
        status={item?.gains > 0 ? 'positive' : 'negative'}
        type="subtext"
      >
        {formatCurrency(item?.gains || 0)} ({item?.gainsPercentage?.toFixed(2) || 0}
        %)
      </Text>
    </View>
  </Container>
)

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomColor: '#303030',
    borderBottomWidth: 1,
  },
  bottomRow: {
    marginTop: 3,
  },
  right: {
    alignItems: 'flex-end',
  },
})

export default PortfolioItem
