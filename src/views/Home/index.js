import React from 'react'
import { View, StyleSheet } from 'react-native'
import { BLACK } from 'utils/colors'
import { Balance, BalanceGraph, PortfolioList } from 'stocket-components'
import { useGetPortfolio } from 'stocket-hooks'
// import { useSelector, useDispatch } from 'react-redux'

export default function Home() {
  const positions = useGetPortfolio()

  return (
    <View style={styles.container}>
      <Balance />
      <BalanceGraph />
      <PortfolioList data={positions} />
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
