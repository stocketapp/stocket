import React, { useState, useEffect, useMemo } from 'react'
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
import { currencyToNumber } from 'utils/functions'
import { last, nth } from 'lodash'

export default function Home() {
  const { userInfo, currentUser } = useUser()
  const uid = currentUser?.uid
  const { positions, loading } = useGetMyStocks(uid)
  const watchlist = useWatchlist(uid)
  const { navigate } = useNavigation()
  const [allowScroll, setAllowScroll] = useState(true)
  const balanceHistory = useGetBalanceHistory(uid, userInfo?.portfolioValue)
  const [balanceValue, setBalanceValue] = useState(null)
  let timeout

  const onWatchlistItemPress = (stockInfo: PositionType) => {
    navigate('Stock', { stockInfo })
  }

  useEffect(() => {
    return () => clearTimeout(timeout)
  }, [timeout])

  const onChartEvent = (value: string | number | null) => {
    setBalanceValue(value)
    if (!value) {
      timeout = setTimeout(() => setAllowScroll(true), 500)
    } else {
      setAllowScroll(false)
    }
  }

  const dayChange = useMemo(() => {
    const lastEl = last(balanceHistory)
    const change =
      currencyToNumber(userInfo?.portfolioValue) -
      currencyToNumber(lastEl?.value)
    return (change ?? 0).toFixed(2) // parseFloat(change ?? 0)
  }, [balanceHistory, userInfo?.portfolioValue])

  return (
    <Container style={styles.container} safeAreaTop>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={allowScroll}
      >
        <Balance
          value={balanceValue ?? userInfo?.portfolioValue}
          dayChange={dayChange}
        />
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
