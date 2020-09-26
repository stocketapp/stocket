import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { BACKGROUND, GRAY_DARKER } from '@utils/colors'
import { Balance, Container, ChartLine, MarketStatus, Text } from '@components'
import {
  useGetMyStocks,
  useWatchlist,
  useGetBalanceHistory,
  useUser,
} from '@hooks'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { callUpdateGains } from '@api'
import { ChartIllustration } from '@components/Icons'
import { filter } from 'lodash'
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
  const [balanceDate, setBalanceDate] = useState(null)
  const dispatch = useDispatch()
  const timeout = useRef()
  const dateNow = useMemo(() => {
    if (!balanceDate) {
      return 'Today'
    }
    return balanceDate
  }, [balanceDate])

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
    item: {
      change: number,
      changePct: number,
      value: number,
      date: string,
    } | null,
  ) => {
    setBalanceValue(item?.value)
    setBalanceChange(item?.change)
    setBalanceChangePct(item?.changePct)
    setBalanceDate(item?.date)

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
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text color={GRAY_DARKER} type="label">
              Invested
            </Text>
            <MarketStatus />
          </View>
          <Balance
            dayChange={{
              change: balanceChange ?? userInfo?.portfolioChange,
              changePct: balanceChangePct ?? userInfo?.portfolioChangePct,
              value: balanceValue ?? userInfo?.portfolioValue,
              date: dateNow,
            }}
          />
        </View>

        {balanceHistory && balanceHistory?.length > 1 ? (
          <ChartLine
            data={filter(balanceHistory, el => el !== null)}
            x="date"
            y="value"
            onChartEvent={onChartEvent}
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
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 25,
  },
})
