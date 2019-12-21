import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { BLACK } from 'utils/colors'
import { Balance, BalanceGraph, PortfolioList } from 'stocket-components'

export default function Home() {
  return (
    <View style={styles.container}>
      <Balance />
      <BalanceGraph />
      <PortfolioList />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: BLACK,
  },
})
