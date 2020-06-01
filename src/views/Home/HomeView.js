import React from 'react'
import { StyleSheet } from 'react-native'
import { BACKGROUND } from 'utils/colors'
import { Balance, LineChart, Container } from 'components'
import { useGetMyStocks } from 'hooks'
import StockHorizontalList from './StockHorizontalList'

export default function Home() {
  const { positions, loading } = useGetMyStocks()

  return (
    <Container style={styles.container} safeAreaTop>
      <Balance />
      <LineChart />
      <StockHorizontalList data={positions} loading={loading} />
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },
})
