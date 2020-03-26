// @flow
import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { GREEN, SUB_BACKGROUND, GRAY_DARKER } from 'utils/colors'
import { formatCurrency } from 'utils/functions'
import type { PositionType } from 'types'
import { Container, Text } from 'components'

const PortfolioItem = ({ item }: { item: PositionType }): React$Node => (
  <TouchableOpacity>
    <Container style={styles.container}>
      <Text color={GREEN} type="heading" weight="700">
        +1.6%
      </Text>

      <Text type="subtext" color="#fff" style={styles.bottomRow}>
        {item?.name}
      </Text>
      <Text type="subtext" color={GRAY_DARKER}>
        {item?.symbol}
      </Text>
      {/* <View>
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
    </View> */}
    </Container>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    width: 130,
    height: 110,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: SUB_BACKGROUND,
    borderRadius: 6,
    marginRight: 20,
  },
  bottomRow: {
    marginTop: 3,
  },
  right: {
    alignItems: 'flex-end',
  },
})

export default PortfolioItem
