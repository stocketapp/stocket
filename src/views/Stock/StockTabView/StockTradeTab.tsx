// @ts-ignore
import { monotoneCubicInterpolation } from '@rainbow-me/animated-charts'
import { Container } from '@components'
import StockChart from '../StockChart'
import useStockHook from '../hooks/useStockHook'
import { useMemo } from 'react'
import { map } from 'lodash'
import StockContentLoader from '../StockContentLoader'

export default function StockTradeTab({ routeParams }: StockTradeTabProps) {
  const moment = require('moment')
  const { quote, chart } = useStockHook(routeParams && routeParams?.symbol)
  const quoteData = quote?.data

  const formatGraph = useMemo(
    () =>
      map(chart?.data, (el: any) => ({
        x: moment(`${el.date} ${el.label}`, 'YYYY-MM-DD LT').valueOf(),
        y: el.close as number,
      })),
    [chart?.data, moment],
  )

  const points = useMemo(() => monotoneCubicInterpolation({ data: formatGraph, range: 40 }), [
    formatGraph,
  ])

  if (quote?.loading || chart?.loading) {
    return <StockContentLoader />
  }

  return (
    <Container fullView>
      {chart?.data?.length > 0 && <StockChart data={points} quote={quoteData} />}
    </Container>
  )
}

interface StockTradeTabProps {
  routeParams: any
  activeTab: number
}
