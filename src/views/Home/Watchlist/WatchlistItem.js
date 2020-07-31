// @flow
import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'components'
import { GREEN, RED, LABEL } from 'utils/colors'

type Props = {
  item: {
    quote: {
      symbol: string,
      change: number,
      latestPrice: number,
      companyName: string,
    },
  },
  onPress: () => void,
}

export default ({ item, onPress }: Props) => {
  const { symbol, change, latestPrice, companyName } = item?.quote
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.left}>
          <Text weight="Semibold">{symbol}</Text>
          <Text color={LABEL} weight="Medium">
            {companyName}
          </Text>
        </View>

        <View style={styles.right}>
          <Text style={{ textAlign: 'right' }} weight="Semibold">
            {latestPrice}
          </Text>
          <View
            style={[
              styles.change,
              { backgroundColor: change >= 0 ? GREEN : RED },
            ]}
          >
            <Text style={{ textAlign: 'right' }} weight="Medium">
              {change > 0 && '+'}
              {change}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  change: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    minWidth: 70,
    borderRadius: 4,
    marginTop: 3,
  },
  left: {
    justifyContent: 'space-between',
  },
  right: {
    justifyContent: 'space-between',
  },
})
