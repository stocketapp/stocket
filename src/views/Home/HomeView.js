import React, { useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { BACKGROUND } from 'utils/colors'
import { Balance, LineChart, Container, VictoryLineGraph } from 'components'
import { useGetMyStocks, useWatchlist } from 'hooks'
import { useNavigation } from '@react-navigation/native'
import StockHorizontalList from './StockHorizontalList'
import Watchlist from './Watchlist'

export default function Home() {
  const { positions, loading } = useGetMyStocks()
  const watchlist = useWatchlist()
  const { navigate } = useNavigation()
  const [allowScroll, setAllowScroll] = useState(true)

  const onWatchlistItemPress = (stockInfo: PositionType) => {
    navigate('Stock', { stockInfo })
  }

  const onTouchStart = e => {
    const y = e.nativeEvent.locationY
    if (y > 50 && y < 400) {
      setAllowScroll(false)
    }
  }

  const onTouchEnd = () => {
    setAllowScroll(true)
  }

  return (
    <Container style={styles.container} safeAreaTop>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        scrollEnabled={allowScroll}
      >
        <Balance />
        <VictoryLineGraph />
        <StockHorizontalList data={positions} loading={loading} />
        {watchlist.length > 0 && (
          <Watchlist data={watchlist} onItemPress={onWatchlistItemPress} />
        )}
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
