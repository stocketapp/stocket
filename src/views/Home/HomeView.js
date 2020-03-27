import React from 'react'
import { View, StyleSheet } from 'react-native'
import { BACKGROUND } from 'utils/colors'
import { Balance, Graph } from 'components'
import { useGetPortfolio } from 'hooks'
import StockHorizontalList from './StockHorizontalList'

export default function Home() {
  const { positions, loading } = useGetPortfolio()

  return (
    <View style={styles.container}>
      <Balance />
      <Graph />
      {/* <BalanceGraph /> */}
      <StockHorizontalList data={positions} loading={loading} />
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
