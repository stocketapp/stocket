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
import { currencyToNumber, formatCurrency } from 'utils/functions'
import { nth } from 'lodash'
import { useDispatch } from 'react-redux'

export default function Home() {
  const { userInfo, currentUser } = useUser()
  const uid = currentUser?.uid
  const { positions, loading } = useGetMyStocks(uid)
  const watchlist = useWatchlist(uid)
  const { navigate } = useNavigation()
  const [allowScroll, setAllowScroll] = useState(true)
  const balanceHistory = useGetBalanceHistory(uid, userInfo?.portfolioValue)
  const [balanceValue, setBalanceValue] = useState(null)
  const dispatch = useDispatch()
  let timeout

  const onWatchlistItemPress = (stockInfo: PositionType) => {
    dispatch({
      type: 'SET_SELECTED_STOCK',
      selectedStock: stockInfo?.quote?.symbol,
    })
    navigate('Stock')
  }

  useEffect(() => {
    return () => clearTimeout(timeout)
  }, [timeout])

  const onChartEvent = (value: string | number | null) => {
    setBalanceValue(value ? formatCurrency(value) : null)
    if (!value) {
      timeout = setTimeout(() => setAllowScroll(true), 500)
    } else {
      setAllowScroll(false)
    }
  }

  const dayChange = useMemo(() => {
    const lastEl = nth(balanceHistory, -2)
    if (!lastEl) {
      return 0
    }
    const change = currencyToNumber(userInfo?.portfolioValue) - lastEl?.value
    return (change ?? 0).toFixed(2)
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
        {balanceHistory && (
          <ChartLine
            data={balanceHistory}
            x="date"
            y="value"
            onChartEvent={onChartEvent}
          />
        )}
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
