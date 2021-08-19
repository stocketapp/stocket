import { Container, LineChart } from '@components'
import { StockViewData } from '../../hooks/useStockHook'
import { useMemo } from 'react'
import { map } from 'lodash'
import moment from 'moment'
import StockTradeButtons from './TradeButtons'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { StockNavigationProps, StockStackParamsList } from 'navigation/stacks/StockStack'
import { IEXChartQuote, PositionType } from 'types'

export default function TradeTab({ position, data }: TradeTabProps) {
  const { params } = useRoute<RouteProp<StockStackParamsList, 'Stock'>>()
  const quote = data?.quote
  const chart = data?.chart
  const { navigate } = useNavigation<StockNavigationProps>()

  const formatGraph = useMemo(
    () =>
      map(chart?.data, (el: IEXChartQuote) => ({
        date: moment(`${el.date}`, 'YYYY-MM-DD LT').valueOf(),
        values: { price: el?.close as number, change: el?.changePercent },
      })),
    [chart?.data],
  )

  // if (quote?.loading || chart?.loading) {
  //   return <StockContentLoader />
  // }

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
      {chart?.data && <LineChart data={formatGraph} />}
      <StockTradeButtons onPress={openTradeModal} />
    </Container>
  )
}

interface TradeTabProps {
  activeTab: number
  position?: PositionType
  data: StockViewData
}
