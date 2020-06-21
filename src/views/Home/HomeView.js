import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { BACKGROUND } from 'utils/colors'
import { Balance, LineChart, Container } from 'components'
import { useGetMyStocks, useWatchlist } from 'hooks'
import { useNavigation } from '@react-navigation/native'
import StockHorizontalList from './StockHorizontalList'
import Watchlist from './Watchlist'

export default function Home() {
  const { positions, loading } = useGetMyStocks()
  const watchlist = useWatchlist()
  const { navigate } = useNavigation()

  const onWatchlistItemPress = (stockInfo: PositionType) => {
    navigate('Stock', { stockInfo })
  }

  return (
    <Container style={styles.container} safeAreaTop>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Balance />
        <LineChart />
        <StockHorizontalList data={positions} loading={loading} />
        <Watchlist data={watchlist} onItemPress={onWatchlistItemPress} />
      </ScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },
})
