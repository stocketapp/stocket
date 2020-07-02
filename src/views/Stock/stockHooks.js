// @flow
import { useEffect, useState, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { getBatchStockData } from 'api'
import { filter } from 'lodash'
import SocketIO from 'socket.io-client'

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

export function usePriceSubscription(symbol: string) {
  const [data, setData] = useState({})

  useEffect(() => {
    const url = 'https://ws-api.iextrading.com/1.0/tops'
    const socket = SocketIO(url)

    if (symbol) {
      socket.on('connect', () => {
        socket.emit('subscribe', symbol)
      })

      socket.on('message', message => {
        const res = JSON.parse(message)
        setData(res)
      })
    }

    return () => socket.emit('unsubscribe', symbol)
  }, [symbol])

  return data
}
