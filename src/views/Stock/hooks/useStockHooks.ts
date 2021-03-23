import { useCallback } from 'react'
import { useQuery } from '@apollo/client'
import { useFocusEffect } from '@react-navigation/core'
import { SYMBOL_QUOTE_QUERY, SYMBOL_CHART_QUERY } from '../queries'
import { IEXQuote } from 'types'
import { StockPriceChartItemType } from '../StockChart'

export default function useStockHook(): StockViewData {
  const {
    data: { quote },
    refetch: refecthQuote,
    loading: loadingQuote,
  } = useQuery(SYMBOL_QUOTE_QUERY, {
    variables: { symbol: 'AAPL' },
  })
  const {
    data: { chart },
    refetch: refetchChart,
    loading: loadingChart,
  } = useQuery(SYMBOL_CHART_QUERY, {
    variables: { symbol: 'AAPL' },
  })

  useFocusEffect(
    useCallback(() => {
      let refetchInterval = setInterval(async () => {
        await refetchChart()
        await refecthQuote()
      }, 15000)

      return () => clearInterval(refetchInterval)
    }, [refecthQuote, refetchChart]),
  )
  return {
    quote: {
      data: quote,
      loading: loadingQuote,
    },
    chart: {
      data: chart,
      loading: loadingChart,
    },
  }
}

export interface StockViewData {
  quote: {
    data: IEXQuote
    loading: boolean
  }
  chart: {
    data: StockPriceChartItemType[]
    loading: boolean
  }
}
