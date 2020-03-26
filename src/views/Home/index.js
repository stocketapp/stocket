import React from 'react'
import { View, StyleSheet } from 'react-native'
import { BACKGROUND } from 'utils/colors'
import { Balance, BalanceGraph, Graph } from 'components'
import { useGetPortfolio } from 'hooks'
import PortfolioList from './PortfolioList'

export default function Home() {
  const { positions, loading } = useGetPortfolio()

  return (
    <View style={styles.container}>
      <Balance />
      <Graph />
      {/* <BalanceGraph /> */}
      <PortfolioList data={positions} loading={loading} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: BACKGROUND,
  },
})
