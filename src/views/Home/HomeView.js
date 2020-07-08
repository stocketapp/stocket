import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { BACKGROUND } from 'utils/colors'
import { Balance, Container, ChartLine, MarketStatus } from 'components'
import {
  useGetMyStocks,
  useWatchlist,
  useGetBalanceHistory,
  useUser,
  useGetMarketStatus,
} from 'hooks'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import StockHorizontalList from './StockHorizontalList'
import Watchlist from './Watchlist'
import { formatCurrency } from 'utils/functions'
import { useDispatch } from 'react-redux'
import { callUpdateGains } from 'api'

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
  const marketStatus = useGetMarketStatus()
  const { portfolioChange: change, portfolioChangePct: changePct } = userInfo
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

  useFocusEffect(
    useCallback(() => {
      const focusTimeout = setTimeout(() => {
        callUpdateGains(uid)
      }, 1000)

      return () => clearTimeout(focusTimeout)
    }, [uid]),
  )

  const onChartEvent = (value: string | number | null) => {
    setBalanceValue(value ? formatCurrency(value) : null)
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
        <View style={styles.header}>
          <Balance
            value={balanceValue ?? userInfo?.portfolioValue}
            dayChange={{ change, changePct }}
          />
          <MarketStatus status={marketStatus} />
        </View>
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
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 15,
  },
})
