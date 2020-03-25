import React from 'react'
import { View, StyleSheet } from 'react-native'
import { BLACK } from 'utils/colors'
import { Balance, BalanceGraph } from 'components'
import { useGetPortfolio } from 'hooks'
import PortfolioList from './PortfolioList'

export default function Home() {
  // const { positions, loading } = useGetPortfolio()

  return (
    <View style={styles.container}>
      {/* <Balance />
      <BalanceGraph />
      <PortfolioList data={positions} loading={loading} /> */}
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
