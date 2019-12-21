import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const Header = () => (
  <View style={styles.container}>
    <Text></Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'red',
  },
})

export default Header
