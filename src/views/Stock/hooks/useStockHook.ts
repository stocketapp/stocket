import { useCallback } from 'react'
import { useQuery } from '@apollo/client'
import { useFocusEffect } from '@react-navigation/core'
import { SYMBOL_QUOTE_QUERY, SYMBOL_CHART_QUERY } from '../queries'
import { IEXQuote } from 'types'
import { ChartPointObject } from '../StockChart'

export default function useStockHook(symbol: string, activeTab: number): StockViewData {
  const {
    data: quoteData,
    refetch: refecthQuote,
    loading: loadingQuote,
    error: quoteError,
  } = useQuery(SYMBOL_QUOTE_QUERY, {
    variables: { symbol },
  })
  const quote = quoteData?.quote
  const {
    data: chartData,
    refetch: refetchChart,
    loading: loadingChart,
    error: chartError,
  } = useQuery(SYMBOL_CHART_QUERY, {
    variables: { symbol },
  })
  const chart = chartData?.chart

  useFocusEffect(
    useCallback(() => {
      const refetchInterval = setInterval(async () => {
        if (activeTab === 0) {
          await refecthQuote()
          await refetchChart()
        }
      }, 15000)

      return () => clearInterval(refetchInterval)
    }, [refecthQuote, activeTab, refetchChart]),
  )

  return {
    quote: {
      data: quote,
      loading: loadingQuote,
      error: quoteError,
    },
    chart: {
      data: chart,
      loading: loadingChart,
      error: chartError,
    },
  }
}

export interface StockViewData {
  quote: {
    data: IEXQuote
    loading: boolean
    error: any
  }
  chart: {
    data: [ChartPointObject]
    loading: boolean
    error: any
  }
}
