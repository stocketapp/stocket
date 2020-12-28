import React, { useState, useCallback } from 'react'
import { View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { Text, Container, Loader, ChartLine, MarketStatus } from '@components'
import { GREEN, BACKGROUND, GRAY_DARKER } from '@utils/colors'
import { ArrowLeftIcon, FavoriteIcon } from '@icons'
import { useDispatch } from 'react-redux'
import { find, minBy } from 'lodash'
import StockDetails from './StockDetails'
import { useNavigation } from '@react-navigation/native'
import StockPosition from './StockPosition'
import StockNews from './StockNews'
import StockTradeBar from './StockTradeBar'
import { addToWatchlist, removeFromWatchlist } from '@api'
import { useSubscribeMarketHours, usePriceSubscription } from '@hooks'
import { useGetCurrentStock, useGraphData } from './stockHooks'
import { useStockSelector, useUserSelector } from '@selectors'
import type { GraphRange } from 'types'

export default function Stock({ route }: { route: any }) {
  const { goBack } = useNavigation()
  const { positions, selectedStock, watchlist } = useStockSelector()
  const selectedStockPosition = find(positions, el => el?.symbol === selectedStock) ?? null
  const stockInfo = route.params?.stockInfo
  const stock = useGetCurrentStock(selectedStock, stockInfo)
  const [graphRange, setGraphRange] = useState<GraphRange>('now')
  const graphData = useGraphData(stock, graphRange)
  const { currentUser } = useUserSelector()
  const uid = currentUser?.uid
  const [allowScroll, setAllowScroll] = useState(true)
  const dispatch = useDispatch()
  const price = usePriceSubscription(selectedStock, selectedStockPosition)
  const latestPrice = price?.toFixed(2) // ?? stock?.quote?.latestPrice
  const marketStatus = useSubscribeMarketHours()
  const symbol = stock?.quote?.symbol ?? ''

  const openTradeView = useCallback(() => {
    dispatch({
      type: 'TRADE_VIEW_IS_OPEN',
      tradeViewIsOpen: true,
    })
    dispatch({
      type: 'STOCK_PRICE',
      stockPrice: latestPrice,
    })
  }, [latestPrice, dispatch])

  const onChartEvent = useCallback((value: string | number | null) => {
    if (!value) {
      setAllowScroll(true)
    } else {
      setAllowScroll(false)
    }
  }, [])

  const isFav = find(watchlist, el => el?.quote?.symbol === stock?.quote?.symbol)

  return (
    <Container style={styles.container} safeAreaTop>
      <View style={styles.navHeader}>
        <TouchableOpacity style={{ padding: 5 }} onPress={goBack}>
          <ArrowLeftIcon size={30} color={GREEN} />
        </TouchableOpacity>
        <MarketStatus />
        {uid && (
          <TouchableOpacity
            onPress={() => (isFav ? removeFromWatchlist(uid, symbol) : addToWatchlist(uid, symbol))}
            style={{ padding: 5 }}
          >
            <FavoriteIcon size={26} color={GREEN} filled={isFav} />
          </TouchableOpacity>
        )}
      </View>

      {!stock && !graphData ? (
        <View style={styles.loader}>
          <Loader size={100} />
        </View>
      ) : (
        <>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 70 }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={allowScroll}
          >
            <View>
              <View style={{ paddingHorizontal: 16, paddingBottom: 15 }}>
                <View style={styles.header}>
                  <Text weight="Black" style={{ fontSize: 30 }}>
                    {stock?.quote?.companyName}
                  </Text>
                  <Text style={{ paddingBottom: 4, left: 10 }} color={GRAY_DARKER} type="label">
                    {stock?.quote?.symbol}
                  </Text>
                </View>
                <Text type="heading" weight="Bold" style={{ paddingTop: 6 }}>
                  {latestPrice}
                </Text>
              </View>

              <ChartLine
                x="label"
                y="value"
                data={graphData}
                chartProps={{
                  minDomain: { y: (minBy(graphData, 'value')?.value ?? 0) - 2 },
                }}
                labelText="value"
                labelRightOffset={40}
                labelLeftOffset={15}
                onEvent={onChartEvent}
                tabs={['now', '1m', '3m', '6m', '1y']}
                onTabPress={setGraphRange}
                activeRangeTab={graphRange}
              />

              {stock && <StockDetails data={stock?.quote} />}

              {selectedStockPosition && <StockPosition data={selectedStockPosition} />}

              {stock?.news && <StockNews articles={stock?.news} />}
            </View>
          </ScrollView>

          {stock && (
            <StockTradeBar
              status={stock?.quote?.change < 0 ? 'negative' : 'positive'}
              price={latestPrice}
              openTradeView={openTradeView}
              marketStatus={marketStatus}
            />
          )}
        </>
      )}
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  bottom: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    backgroundColor: BACKGROUND,
    width: '100%',
  },
  header: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    alignItems: 'center',
  },
})
