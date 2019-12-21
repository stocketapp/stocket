import React from 'react'
import { View, StyleSheet } from 'react-native'
import Text from '../Text'
import { GRAY_DARKER } from 'utils/colors'

const PortfolioItem = () => (
  <View style={styles.container}>
    <View>
      <Text>MSFT</Text>
      <Text color={GRAY_DARKER} style={{ }}>Microsoft</Text>
    </View>
    <View>
      <Text>$2,780.54</Text>
      <Text positive>$469.67 (16%)</Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {

  }
})

export default PortfolioItem
