import React, { useMemo, useEffect, useState } from 'react'
import { View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { Text, LineChart, Container, Loader } from 'components'
import { GREEN, BACKGROUND, GRAY_DARKER } from 'utils/colors'
import { ArrowLeftIcon, FavoriteIcon } from 'components/Icons'
import { useSelector, useDispatch } from 'react-redux'
import StockDetails from './StockDetails'
import { useNavigation } from '@react-navigation/native'
import StockPosition from './StockPosition'
import StockNews from './StockNews'
import filter from 'lodash.filter'
import StockTradeBar from './StockTradeBar'
import { getBatchStockData, addToWatchlist } from 'api'

export default function Stock({ route }) {
  const { goBack } = useNavigation()
  const { selectedStockPosition, selectedStock } = useSelector(
    ({ stock }) => stock,
  )
  const { uid } = useSelector(({ user }) => user?.currentUser)
  const [stock, setStock] = useState(null)
  const dispatch = useDispatch()
  const stockInfo = route.params?.stockInfo

  const graphData = useMemo(() => {
    const arr = filter(stock?.chart, el => el?.close !== null)
    return arr.map(el => ({
      value: el.close,
      label: el.label,
      date: el.date,
    }))
  }, [stock])

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

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getBatchStockData(selectedStock)
        const result = res[selectedStock]
        dispatch({
          type: 'TRADE_STOCK',
          tradeStock: result,
        })
        setStock(result)
      } catch (err) {
        console.log('[StockView] getData()', err)
      }
    }

    if (!stockInfo) {
      getData()
    } else {
      console.log(stockInfo)
      setStock(stockInfo)
    }
  }, [selectedStockPosition, selectedStock, dispatch, stockInfo])

  const hasPosition =
    selectedStockPosition?.shares &&
    selectedStockPosition?.symbol === selectedStock

  return (
    <Container style={styles.container} safeAreaTop>
      <View style={styles.navHeader}>
        <TouchableOpacity style={{ padding: 5 }} onPress={goBack}>
          <ArrowLeftIcon size={30} color={GREEN} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => addToWatchlist(uid, { symbol: stock?.quote?.symbol })}
          disabled={!stockInfo}
          style={{ padding: 5 }}
        >
          <FavoriteIcon size={26} color={GREEN} filled={!!stockInfo} />
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
                  {stock?.quote?.iexRealtimePrice}
                </Text>
              </View>

              {graphData && stock?.chart && <LineChart data={graphData} />}

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
