import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { BACKGROUND } from 'utils/colors'
import { Balance, Container, ChartLine } from 'components'
import {
  useGetMyStocks,
  useWatchlist,
  useGetBalanceHistory,
  useUser,
} from 'hooks'
import { useNavigation } from '@react-navigation/native'
import StockHorizontalList from './StockHorizontalList'
import Watchlist from './Watchlist'

export default function Home() {
  const { userInfo, currentUser } = useUser()
  const uid = currentUser?.uid
  const { positions, loading } = useGetMyStocks(uid)
  const watchlist = useWatchlist(uid)
  const { navigate } = useNavigation()
  const [allowScroll, setAllowScroll] = useState(true)
  const balanceHistory = useGetBalanceHistory(uid, userInfo?.portfolioValue)
  const [balanceValue] = useState(null)
  let timeout

  const onWatchlistItemPress = (stockInfo: PositionType) => {
    navigate('Stock', { stockInfo })
  }

  useEffect(() => {
    return () => clearTimeout(timeout)
  }, [timeout])

  const onChartEvent = (value: string | number | null) => {
    if (!value) {
      timeout = setTimeout(() => setAllowScroll(true), 500)
    } else {
      setAllowScroll(false)
    }
  }

  return (
    <Container style={styles.container} safeAreaTop>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={allowScroll}
      >
        <Balance value={balanceValue ?? userInfo?.portfolioValue} />
        <ChartLine
          data={balanceHistory}
          x="date"
          chartProps={{
            minDomain: { y: 0.8 },
          }}
          onChartEvent={onChartEvent}
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
