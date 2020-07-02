import React, { useState } from 'react'
import { View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { Text, Container, Loader, ChartLine } from 'components'
import { GREEN, BACKGROUND, GRAY_DARKER } from 'utils/colors'
import { ArrowLeftIcon, FavoriteIcon } from 'components/Icons'
import { useSelector, useDispatch } from 'react-redux'
import StockDetails from './StockDetails'
import { useNavigation } from '@react-navigation/native'
import StockPosition from './StockPosition'
import StockNews from './StockNews'
import StockTradeBar from './StockTradeBar'
import { addToWatchlist, removeFromWatchlist } from 'api'
import { find, minBy } from 'lodash'
import {
  useGetCurrentStock,
  useGraphData,
  usePriceSubscription,
} from './stockHooks'

export default function Stock({ route }) {
  const { goBack } = useNavigation()
  const { selectedStockPosition, selectedStock, watchlist } = useSelector(
    ({ stock }) => stock,
  )
  const stockInfo = route.params?.stockInfo
  const stock = useGetCurrentStock(selectedStock, stockInfo)
  const graphData = useGraphData(stock)
  const { uid } = useSelector(({ user }) => user?.currentUser)
  const [allowScroll, setAllowScroll] = useState(true)
  const dispatch = useDispatch()
  const { price } = usePriceSubscription(selectedStockPosition)

  const openTradeView = () => {
    dispatch({
      type: 'TRADE_VIEW_IS_OPEN',
      tradeViewIsOpen: true,
    })
    dispatch({
      type: 'STOCK_PRICE',
      stockPrice: stock?.quote?.latestPrice,
    })
  }

  const onChartEvent = (value: string | number | null) => {
    if (!value) {
      setAllowScroll(true)
    } else {
      setAllowScroll(false)
    }
  }

  const hasPosition =
    selectedStockPosition?.shares &&
    selectedStockPosition?.symbol === selectedStock

  const isFav = find(
    watchlist,
    el => el?.quote?.symbol === stock?.quote?.symbol,
  )

  return (
    <Container style={styles.container} safeAreaTop>
      <View style={styles.navHeader}>
        <TouchableOpacity style={{ padding: 5 }} onPress={goBack}>
          <ArrowLeftIcon size={30} color={GREEN} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            isFav
              ? removeFromWatchlist(uid, stock?.quote?.symbol)
              : addToWatchlist(uid, stock?.quote?.symbol)
          }
          style={{ padding: 5 }}
        >
          <FavoriteIcon size={26} color={GREEN} filled={isFav} />
        </TouchableOpacity>
      </View>

      {!stock ? (
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
                  <Text
                    style={{ paddingBottom: 4, left: 10 }}
                    color={GRAY_DARKER}
                    type="label"
                  >
                    {stock?.quote?.symbol}
                  </Text>
                </View>
                <Text type="heading" weight="bold" style={{ paddingTop: 6 }}>
                  {/* {stock?.quote?.iexRealtimePrice} */}
                  {price?.toFixed(2) ??
                    stock?.quote?.iexRealtimePrice.toFixed(2)}
                </Text>
              </View>

              {stock?.chart && graphData && (
                <ChartLine
                  x="label"
                  y="value"
                  data={graphData}
                  chartProps={{
                    minDomain: { y: minBy(graphData, 'value')?.value - 2 },
                  }}
                  labelText="value"
                  labelRightOffset={40}
                  labelLeftOffset={15}
                  onChartEvent={onChartEvent}
                />
              )}

              <StockDetails data={stock?.quote} />

              {hasPosition && <StockPosition data={selectedStockPosition} />}

              {stock?.news && process.env.NODE_ENV !== 'development' && (
                <StockNews articles={stock?.news} />
              )}
            </View>
          </ScrollView>

          <StockTradeBar
            status={stock?.quote?.change < 0 ? 'negative' : 'positive'}
            price={stock?.quote?.latestPrice}
            openTradeView={openTradeView}
            stockData={stock}
          />
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
