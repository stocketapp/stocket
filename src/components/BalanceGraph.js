import React from 'react'
import { View, Text } from 'react-native'

const container = {
  height: 220,
  backgroundColor: '#303030',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 30,
}

const BalanceGraph = () => (
  <View style={container}>
    <Text style={{ color: '#fff', fontSize: 20 }}>GRAPH</Text>
  </View>
)

export default BalanceGraph
