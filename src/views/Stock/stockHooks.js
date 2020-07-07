// @flow
import { useEffect, useState, useMemo, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { getBatchStockData, updatePosition } from 'api'
import { filter, reduce } from 'lodash'
import SocketIO from 'socket.io-client'
import { useUser } from 'hooks'

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

export function useGraphData(stock: { chart: [] }) {
  const getGraphData = (item: { chart: [] }) => {
    const arr = filter(item?.chart, el => el?.close !== null)
    const result = arr.map(el => ({
      value: el.close,
      label: el.label,
      date: el.date,
    }))
    return result
  }

  return useMemo(() => getGraphData(stock), [stock])
}

type UsePriceSubscriptionTypes = {
  symbol: string,
  shares: [],
}
export function usePriceSubscription(position: UsePriceSubscriptionTypes) {
  const [data, setData] = useState({})
  const { currentUser } = useUser()
  const symbol = position?.symbol
  const shares = position?.shares

  const getGains = (price) => {
    const value = shares?.length * price
    const gainsArr = shares.map(el => price - el.price)
    const gains = reduce(gainsArr, (a, b) => a + b)
    const gainsPercentage = (gains / value) * 100
    return { gains, gainsPercentage, value }
  }

  const calcGains = useCallback(getGains, [data?.price])

  useEffect(() => {
    const url = 'https://ws-api.iextrading.com/1.0/last'
    const socket = SocketIO(url)
    let throttleUpdate

    if (symbol) {
      socket.on('connect', () => {
        socket.emit('subscribe', symbol)
      })

      socket.on('message', async message => {
        const res = JSON.parse(message)
        setData(res)
        const positionGains = calcGains(res?.price)
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
  }, [])

  return data
}
