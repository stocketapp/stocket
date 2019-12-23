import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import Text from '../Text'

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width: '100%',
  },
}

const PortfolioEmpty = () => (
  <View style={styles.container}>
    <Text cap>Portfolio is empty</Text>

    
  </View>
)

export default PortfolioEmpty
