import { useCallback } from 'react'
import { useQuery } from '@apollo/client'
import { useFocusEffect } from '@react-navigation/core'
import { SYMBOL_QUOTE_QUERY, SYMBOL_CHART_QUERY } from '../queries'
import { IEXQuote } from 'types'
import { StockPriceChartItemType } from '../StockChart'

export default function useStockHook(): StockViewData {
  const {
    data: quoteData,
    refetch: refecthQuote,
    loading: loadingQuote,
    error: quoteError,
  } = useQuery(SYMBOL_QUOTE_QUERY, {
    variables: { symbol: 'AAPL' },
  })
  const quote = quoteData?.quote
  const {
    data: chartData,
    refetch: refetchChart,
    loading: loadingChart,
    error: chartError,
  } = useQuery(SYMBOL_CHART_QUERY, {
    variables: { symbol: 'AAPL' },
  })
  const chart = chartData?.chart

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
    data: StockPriceChartItemType[]
    loading: boolean
    error: any
  }
}
