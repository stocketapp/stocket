import React, { useState, useMemo } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { BACKGROUND } from 'utils/colors'
import { Balance, Container, VictoryLineGraph } from 'components'
import { useGetMyStocks, useWatchlist, useGetBalanceHistory } from 'hooks'
import { useNavigation } from '@react-navigation/native'
import StockHorizontalList from './StockHorizontalList'
import Watchlist from './Watchlist'
import { useSelector } from 'react-redux'
import { minBy } from 'lodash'

export default function Home() {
  const { currentUser, userInfo } = useSelector(({ user }) => user)
  const uid = currentUser?.uid
  const { positions, loading } = useGetMyStocks(uid)
  const watchlist = useWatchlist(uid)
  const { navigate } = useNavigation()
  const [allowScroll, setAllowScroll] = useState(true)
  const balanceHistory = useGetBalanceHistory(uid, userInfo?.portfolioValue)

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
        <VictoryLineGraph
          data={balanceHistory}
          x="date"
          chartProps={{
            minDomain: { y: 0.8 },
          }}
        />
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
