import { useCallback } from 'react'
import { useQuery } from '@apollo/client'
import { useFocusEffect } from '@react-navigation/core'
import { SYMBOL_QUOTE_QUERY, SYMBOL_CHART_QUERY_ONE_DAY } from '../queries'
import { IEXChartQuote, IEXQuote } from 'types'

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
    loading: loadingChart,
    error: chartError,
  } = useQuery(SYMBOL_CHART_QUERY_ONE_DAY, {
    variables: { symbol },
  })
  const chart = chartData?.intraday

  useFocusEffect(
    useCallback(() => {
      const refetchInterval = setInterval(async () => {
        if (activeTab === 0) {
          await refecthQuote()
        }
      }, 15000)

      return () => clearInterval(refetchInterval)
    }, [refecthQuote, activeTab]),
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
    data: IEXChartQuote[]
    loading: boolean
    error: any
  }
}
