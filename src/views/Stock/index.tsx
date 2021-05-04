import { Dimensions, View } from 'react-native'
import { useRoute } from '@react-navigation/core'
import StockNavHeader from './StockNavHeader'
import StockTabView from './StockTabView'

export const { width: SIZE } = Dimensions.get('window')

export default function Stock() {
  const { params }: any = useRoute()

  return (
    <View style={{ flex: 1 }}>
      <StockNavHeader symbol={params?.symbol} companyName={params?.companyName} />
      <StockTabView routeParams={params} />
    </View>
    // <Container fullView scrollable>
    //   <StockNavHeader symbol={params?.symbol} companyName={quoteData?.companyName} />

    //   {/* {chart?.data?.length > 0 && <StockChart data={points} quote={quoteData} />} */}
    //   <StockTabView />
    // </Container>
  )
}
