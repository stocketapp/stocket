// @flow
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getBatchStockData, updatePosition, getHistoricalData } from 'api'
import { filter, reduce } from 'lodash'
import SocketIO from 'socket.io-client'
import { useUser } from 'hooks'
import { subtract } from 'lodash'
import { useAsyncStorage } from '@react-native-community/async-storage'

export function useGetCurrentStock(selectedStock: string, stockInfo: {}) {
  const dispatch = useDispatch()
  const [stock, setStock] = useState(null)

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
        console.log('useGetCurrentStock()', err)
      }
    }

    if (!stockInfo) {
      getData()
    } else {
      setStock(stockInfo)
    }
  }, [selectedStock, dispatch, stockInfo])

  return stock
}

type GraphData = {
  data: { chart: [] } | [{}],
}
type GraphRange = 'now' | '1m' | '3m' | '6m' | '1y'

export function useGraphData(stockData: GraphData, range: GraphRange = 'now') {
  const [graphData, setGraphData] = useState()
  const { getItem, setItem } = useAsyncStorage(
    `@stocket_historical: ${stockData?.quote?.symbol}_${range}`,
  )

  useEffect(() => {
    const getGraphData = data => {
      const arr = filter(data, el => el?.close !== null)
      const result = arr.map(el => ({
        value: el.close,
        label: el.label,
        date: el.date,
      }))
      setGraphData(result)
    }

    const getHistData = async () => {
      let data = null
      try {
        const item = await getItem()
        if (item) {
          data = JSON.parse(item)
        } else {
          data = await getHistoricalData(stockData?.quote?.symbol, range)
          await setItem(JSON.stringify(data))
        }
        getGraphData(data)
      } catch (err) {
        console.log('[ERROR] getHistData', err)
      }
    }

    if (range !== 'now') {
      getHistData()
    } else {
      getGraphData(stockData?.chart)
    }
  }, [stockData, range, getItem, setItem])

  return graphData
}

type UsePriceSubscriptionTypes = {
  symbol: string,
  shares: [],
  previousDayPrice: number,
}
export function usePriceSubscription(position: UsePriceSubscriptionTypes) {
  const [data, setData] = useState({})
  const { currentUser } = useUser()
  const symbol = position?.symbol
  const shares = position?.shares
  const prevDayPrice = position?.previousDayPrice

  useEffect(() => {
    const url = 'https://ws-api.iextrading.com/1.0/last'
    const socket = SocketIO(url)
    let throttleUpdate

    const getGains = price => {
      const value = shares?.length * price
      const gainsArr = shares.map(el => price - el.price)
      const gains = reduce(gainsArr, (a, b) => a + b)
      const gainsPercentage = (gains / value) * 100
      const prevValue = reduce(
        shares.map(el => prevDayPrice - el.price),
        (a, b) => a + b,
      )
      const todayGains = subtract(Math.abs(gains), Math.abs(prevValue))
      const todayGainsPct = (todayGains / value) * 100
      return { gains, gainsPercentage, value, todayGains, todayGainsPct }
    }

    if (symbol) {
      socket.on('connect', () => {
        socket.emit('subscribe', symbol)
      })

      socket.on('message', async message => {
        const res = JSON.parse(message)
        setData(res)
        const positionGains = getGains(res?.price)
        const obj = {
          ...positionGains,
        }
        throttleUpdate = setTimeout(async () => {
          await updatePosition({ uid: currentUser?.uid, symbol, data: obj })
        }, 2000)
      })
    }

    return () => {
      socket.emit('unsubscribe', symbol)
      socket.close()
      clearTimeout(throttleUpdate)
    }
  }, [currentUser?.uid, prevDayPrice, shares, symbol])

  return data
}
