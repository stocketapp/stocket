import { useState } from 'react'
// @ts-ignore
import { monotoneCubicInterpolation } from '@rainbow-me/animated-charts'
import { Container } from '@components'
import StockChart from '../StockChart'
import useStockHook from '../hooks/useStockHook'
import { useMemo } from 'react'
import { map } from 'lodash'
import StockContentLoader from '../StockContentLoader'
import moment from 'moment'
import StockTradeButtons from './StockTradeButtons'
import StockTradeModal from '../StockTradeModal'

export default function StockTradeTab({ routeParams, activeTab }: StockTradeTabProps) {
  const { quote, chart } = useStockHook(routeParams && routeParams?.symbol, activeTab)
  const quoteData = quote?.data
  const [tradeModalVisible, setModalVisible] = useState(false)

  const formatGraph = useMemo(
    () =>
      map(chart?.data, (el: any) => ({
        x: moment(`${el.date} ${el.label}`, 'YYYY-MM-DD LT').valueOf(),
        y: el.close as number,
      })),
    [chart?.data],
  )

  const points = useMemo(
    () => monotoneCubicInterpolation({ data: formatGraph, range: 40 }),
    [formatGraph],
  )

  if (quote?.loading || chart?.loading) {
    return <StockContentLoader />
  }

  return (
    <Container fullView>
      {chart?.data?.length > 0 && <StockChart data={points} quote={quoteData} />}
      <StockTradeButtons onPress={() => setModalVisible(true)} />
      <StockTradeModal
        quote={quoteData}
        visible={tradeModalVisible}
        setVisible={setModalVisible}
      />
    </Container>
  )
}

interface StockTradeTabProps {
  routeParams: any
  activeTab: number
}
