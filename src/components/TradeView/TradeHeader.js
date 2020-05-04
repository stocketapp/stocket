import React from 'react'
import { View } from 'react-native'
import Text from '../Text'

export default ({ symbol }: { symbol: string }) => (
  <View style={styles.container}>
    <Text type="heading" weight="bold">
      Buy {symbol}
    </Text>
  </View>
)

const styles = {
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
}
