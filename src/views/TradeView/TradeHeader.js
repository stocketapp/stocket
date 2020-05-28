import React from 'react'
import { View } from 'react-native'
import Text from '../../components/Text'

export default ({ symbol, isSell }: { symbol: string, isSell: boolean }) => (
  <View style={styles.container}>
    <Text type="heading" weight="Black">
      {isSell ? 'Sell' : 'Buy'} {symbol}
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
