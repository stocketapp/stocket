import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@components'
import { GRAY_DARKER, LABEL } from '@utils/colors'
import { formatCurrency } from '@utils/functions'

export default ({ total }: { total: number }) => (
  <View style={{ paddingHorizontal: 16 }}>
    <View style={styles.container}>
      <Text type="title" color={LABEL}>
        Total
      </Text>
      <Text type="title" weight="Black">
        {formatCurrency(total)}
      </Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.2,
    borderBottomColor: GRAY_DARKER,
    paddingBottom: 14,
  },
})
