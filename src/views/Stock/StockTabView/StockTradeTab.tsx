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
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { StockStackParamList } from 'navigation/stacks/StockStack'

export default function StockTradeTab({ activeTab }: StockTradeTabProps) {
  const { params } = useRoute<RouteProp<StockStackParamList, 'Stock'>>()
  const { quote, chart } = useStockHook(params?.symbol, activeTab)
  const quoteData = quote?.data
  const { navigate } = useNavigation()

  const formatGraph = useMemo(
    () =>
      map(chart?.data, (el: any) => ({
        x: moment(`${el.date}`, 'YYYY-MM-DD LT').valueOf(),
        y: el.close as number,
      })),
    [chart?.data],
  )

  const points = useMemo(
    () => monotoneCubicInterpolation({ data: formatGraph, range: 100 }),
    [formatGraph],
  )

  if (quote?.loading || chart?.loading) {
    return <StockContentLoader />
  }

  const openTradeModal = (orderType: 'BUY' | 'SELL') => {
    navigate('TradeStack', {
      screen: 'TradeModal',
      params: { price: quoteData?.latestPrice, orderType, ...params },
    })
  }

  return (
    <Container fullView>
      {chart?.data && <StockChart data={points} quote={quoteData} />}
      <StockTradeButtons onPress={openTradeModal} />
    </Container>
  )
}

interface StockTradeTabProps {
  activeTab: number
}
