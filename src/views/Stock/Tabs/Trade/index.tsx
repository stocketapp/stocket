import { Container, LineChart } from '@components'
import { StockViewData } from '../../hooks/useStockHook'
import { useMemo } from 'react'
import { map } from 'lodash'
import moment from 'moment'
import StockTradeButtons from './TradeButtons'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { StockNavigationProps, StockStackParamsList } from 'navigation/stacks/StockStack'
import { IEXChartQuote, PositionType } from 'types'
import TradeTabLoader from '../../ContentLoaders/TradeTabLoader'

export default function TradeTab({ position, data }: TradeTabProps) {
  const { params } = useRoute<RouteProp<StockStackParamsList, 'Stock'>>()
  const quote = data?.quote
  const chart = data?.chart
  const { navigate } = useNavigation<StockNavigationProps>()

  const formatGraph = useMemo(
    () =>
      map(chart?.data, ({ minute, close, date, changeOverTime }: IEXChartQuote) => ({
        date: moment(`${date} ${minute}`, 'YYYY-MM-DD LT').local().valueOf(),
        values: { price: close as number, change: changeOverTime },
      })).filter(el => el.values.price !== null),
    [chart?.data],
  )

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
    <Container fullView bottom={50}>
      {chart?.data ? (
        <>
          <LineChart
            data={formatGraph}
            defaultValues={{
              price: quote?.data?.latestPrice,
              change: quote?.data?.changePercent,
            }}
          />
          <StockTradeButtons onPress={openTradeModal} />
        </>
      ) : (
        <TradeTabLoader />
      )}
    </Container>
  )
}

interface TradeTabProps {
  activeTab: number
  position?: PositionType
  data: StockViewData
}
