// @ts-ignore
import { monotoneCubicInterpolation } from '@rainbow-me/animated-charts'
import { Container } from '@components'
import StockChart from '../../StockChart'
import { StockViewData } from '../../hooks/useStockHook'
import { useMemo } from 'react'
import { map } from 'lodash'
import StockContentLoader from '../../StockContentLoader'
import moment from 'moment'
import StockTradeButtons from './TradeButtons'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { StockNavigationProps, StockStackParamsList } from 'navigation/stacks/StockStack'
import { PositionType } from 'types'

export default function TradeTab({ position, data }: TradeTabProps) {
  const { params } = useRoute<RouteProp<StockStackParamsList, 'Stock'>>()
  const quote = data?.quote
  const chart = data?.chart
  const { navigate } = useNavigation<StockNavigationProps>()

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
      params: {
        price: quote?.data.latestPrice,
        orderType,
        ownedShares: position?.size,
        ...params,
      },
    })
  }

  return (
    <Container fullView>
      {chart?.data && <StockChart data={points} quote={quote?.data} />}
      <StockTradeButtons onPress={openTradeModal} />
    </Container>
  )
}

interface TradeTabProps {
  activeTab: number
  position?: PositionType
  data: StockViewData
}
