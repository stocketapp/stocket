// @flow
import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { GREEN, SUB_BACKGROUND, GRAY_DARKER } from 'utils/colors'
import type { PositionType } from 'types'
import { Container, Text } from 'components'

const PortfolioItem = ({ item }: { item: PositionType }): React$Node => (
  <TouchableOpacity>
    <Container style={styles.container}>
      <Text color={GREEN} type="heading" weight="700">
        {item?.gainsPercentage?.toFixed(2) || 0}%
      </Text>

      <Text type="subtext" color="#fff" style={styles.bottomRow}>
        {item?.name}
      </Text>
      <Text type="subtext" color={GRAY_DARKER}>
        {item?.symbol}
      </Text>
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
