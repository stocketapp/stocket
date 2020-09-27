/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getBatchStockData, getHistoricalData } from '@api'
import { filter } from 'lodash'
import { useAsyncStorage } from '@react-native-community/async-storage'
import type { SelectedStockData, SelectedStockChart, GraphRange } from 'types'

export function useGetCurrentStock(
  selectedStock: string,
  stockInfo: SelectedStockData,
): SelectedStockData | null {
  const dispatch = useDispatch()
  const [stock, setStock] = useState<SelectedStockData | null>(null)

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
  data: { chart: [] } | [{}]
}

export function useGraphData(stockData: SelectedStockData | null, range: GraphRange = 'now') {
  const [graphData, setGraphData] = useState<Array<{ value: number; label: string; date: string }>>(
    [],
  )
  const { getItem, setItem } = useAsyncStorage(
    `@stocket_historical: ${stockData?.quote?.symbol}_${range}`,
  )

  useEffect(() => {
    const getGraphData = (data: Array<SelectedStockChart>) => {
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
          // save data to cache
          data = JSON.parse(item)
        } else {
          data = await getHistoricalData(stockData?.quote?.symbol ?? '', range)
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
      getGraphData(stockData?.chart ?? [])
    }
  }, [stockData, range])

  return graphData
}
