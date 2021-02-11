import React, { useEffect, useState, useRef, useMemo } from 'react'
import { View, ScrollView } from 'react-native'
import { Container, Text, MarketStatus, Balance } from '@components'
import { WatchlistList } from './Watchlist'
import { HeaderContainer } from './styles'
import { useGetMyStocks, useUser } from '@hooks'
import { useTheme } from '@emotion/react'
// import { useNavigation, useFocusEffect } from '@react-navigation/native'
import StockHorizontalList from './StockHorizontalList'

export default function Home() {
  const theme = useTheme()
  const { userInfo, currentUser } = useUser()
  const uid = currentUser?.uid
  const { positions, loading } = useGetMyStocks(uid)
  // const { navigate } = useNavigation()
  // const [allowScroll, setAllowScroll] = useState(true)
  // const balanceHistory = useGetBalanceHistory(uid, userInfo)
  const [balanceValue, setBalanceValue] = useState(0)
  const [balanceChange, setBalanceChange] = useState(0)
  const [balanceChangePct, setBalanceChangePct] = useState(0)
  const [balanceDate] = useState('')
  const timeout = useRef<any>(null)
  const dateNow = useMemo(() => {
    if (!balanceDate) {
      return 'Today'
    }
    return balanceDate
  }, [balanceDate])

  useEffect(() => {
    const current = timeout.current
    return () => clearTimeout(current)
  }, [timeout])

  useEffect(() => {
    setBalanceValue(userInfo?.portfolioValue)
    setBalanceChange(userInfo?.portfolioChange)
    setBalanceChangePct(userInfo?.portfolioChangePct)
  }, [userInfo])

  // useFocusEffect(
  //   useCallback(() => {
  //     const focusTimeout = setTimeout(() => {
  //       // callUpdateGains(uid)
  //     }, 1000)

  //     return () => clearTimeout(focusTimeout)
  //   }, [uid]),
  // )

  return (
    <Container fullView safeAreaTop ph>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <HeaderContainer>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text color={theme.colors.GRAY} type="label">
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
        </HeaderContainer>
        <StockHorizontalList data={positions} loading={loading} />
        <WatchlistList />
      </ScrollView>
    </Container>
  )
}
