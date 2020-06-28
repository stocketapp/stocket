// @flow
import { useEffect, useState, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { getBatchStockData } from 'api'
import { filter } from 'lodash'

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
