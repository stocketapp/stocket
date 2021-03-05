import React from 'react'
import { View, ScrollView } from 'react-native'
import { Container, Text, MarketStatus, Balance } from '@components'
import { WatchlistList } from './Watchlist'
import { HeaderContainer } from './styles'
import { useTheme } from '@emotion/react'
import useHomeHook from './hooks/useHomeHook'

export default function Home() {
  const { colors } = useTheme()
  const { invested, watchlist } = useHomeHook()

  return (
    <Container fullView safeAreaTop ph>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <HeaderContainer>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text color={colors.GRAY} type="label">
              Invested
            </Text>
            <MarketStatus />
          </View>
          <Balance
            dayChange={{
              change: 0,
              changePct: 0,
              value: invested?.value,
              date: 'Today',
            }}
          />
        </HeaderContainer>
        {/* <StockHorizontalList data={positions} loading={loading} /> */}
        <WatchlistList data={watchlist} />
      </ScrollView>
    </Container>
  )
}
