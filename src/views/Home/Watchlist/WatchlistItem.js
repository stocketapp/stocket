import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'components'
import { GREEN, RED, LABEL } from 'utils/colors'

export default ({ item }) => {
  const { symbol, change, latestPrice, companyName } = item?.quote
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text>{symbol}</Text>
        <Text color={LABEL}>{companyName}</Text>
      </View>

      <View style={styles.right}>
        <Text style={{ textAlign: 'right' }}>{latestPrice}</Text>
        <View
          style={[
            styles.change,
            { backgroundColor: change >= 0 ? GREEN : RED },
          ]}
        >
          <Text style={{ textAlign: 'right' }} weight="Medium">
            {change}
          </Text>
        </View>
      </View>
    </View>
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
    minWidth: 62,
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
