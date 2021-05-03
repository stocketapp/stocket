import { useMemo } from 'react'
// @ts-ignore
import { monotoneCubicInterpolation } from '@rainbow-me/animated-charts'
import { Dimensions, View } from 'react-native'
import { map } from 'lodash'
import moment from 'moment'
import { Container } from '@components'
import { useRoute } from '@react-navigation/core'
import StockContentLoader from './StockContentLoader'
import useStockHook from './hooks/useStockHook'
import StockNavHeader from './StockNavHeader'
import StockChart from './StockChart'
import StockTabView from './StockTabView'

export const { width: SIZE } = Dimensions.get('window')

export default function Stock() {
  const { params }: any = useRoute()
  const { quote, chart } = useStockHook(params && params?.symbol)
  const quoteData = quote?.data

  const formatGraph = useMemo(
    () =>
      map(chart?.data, (el: any) => ({
        x: moment(`${el.date} ${el.label}`, 'YYYY-MM-DD LT').valueOf(),
        y: el.close as number,
      })),
    [chart?.data],
  )

  const points = useMemo(() => monotoneCubicInterpolation({ data: formatGraph, range: 40 }), [
    formatGraph,
  ])

  if (quote?.loading || chart?.loading) {
    return <StockContentLoader />
  }

  return (
    <View style={{ flex: 1 }}>
      <StockNavHeader symbol={params?.symbol} companyName={quoteData?.companyName} />
      <StockTabView />
    </View>
    // <Container fullView scrollable>
    //   <StockNavHeader symbol={params?.symbol} companyName={quoteData?.companyName} />

    //   {/* {chart?.data?.length > 0 && <StockChart data={points} quote={quoteData} />} */}
    //   <StockTabView />
    // </Container>
  )
}
