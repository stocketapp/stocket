import React, { useState, useEffect, useRef, useCallback } from 'react'
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
import { useDispatch } from 'react-redux'
import { callUpdateGains } from 'api'
import { ChartIllustration } from 'components/Icons'
import StockHorizontalList from './StockHorizontalList'
import Watchlist from './Watchlist'

export default function Home() {
  const { userInfo, currentUser } = useUser()
  const uid = currentUser?.uid
  const { positions, loading } = useGetMyStocks(uid)
  const watchlist = useWatchlist(uid)
  const { navigate } = useNavigation()
  const [allowScroll, setAllowScroll] = useState(true)
  const balanceHistory = useGetBalanceHistory(uid, userInfo)
  const [balanceValue, setBalanceValue] = useState(null)
  const [balanceChange, setBalanceChange] = useState(null)
  const [balanceChangePct, setBalanceChangePct] = useState(null)
  const dispatch = useDispatch()
  const marketStatus = useGetMarketStatus()
  const timeout = useRef()

  const onWatchlistItemPress = (stockInfo: PositionType) => {
    dispatch({
      type: 'SET_SELECTED_STOCK',
      selectedStock: stockInfo?.quote?.symbol,
    })
    navigate('Stock')
  }

  useEffect(() => {
    return () => clearTimeout(timeout.current)
  }, [timeout])

  useEffect(() => {
    setBalanceValue(userInfo?.portfolioValue)
    setBalanceChange(userInfo?.portfolioChange)
    setBalanceChangePct(userInfo?.portfolioChangePct)
  }, [userInfo])

  useFocusEffect(
    useCallback(() => {
      const focusTimeout = setTimeout(() => {
        callUpdateGains(uid)
      }, 1000)

      return () => clearTimeout(focusTimeout)
    }, [uid]),
  )

  const onChartEvent = (
    item: { change: number, changePct: number, value: number } | null,
  ) => {
    setBalanceValue(item?.value ?? userInfo?.portfolioValue)
    setBalanceChange(item?.change ?? userInfo?.portfolioChange)
    setBalanceChangePct(item?.changePct ?? userInfo?.portfolioChangePct)

    if (!item) {
      timeout.current = setTimeout(() => setAllowScroll(true), 500)
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
            dayChange={{
              change: balanceChange ?? userInfo?.portfolioChange,
              changePct: balanceChangePct ?? userInfo?.portfolioChangePct,
              value: balanceValue ?? userInfo?.portfolioValue,
            }}
          />
          <MarketStatus status={marketStatus} />
        </View>

        {balanceHistory && balanceHistory?.length > 1 ? (
          <ChartLine
            data={balanceHistory}
            x="date"
            y="value"
            onChartEvent={onChartEvent}
            lineProps={{ animate: { duration: 500, easing: 'linear' } }}
          />
        ) : (
          <ChartIllustration />
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
    paddingTop: 25,
  },
})
