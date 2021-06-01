import { View } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/core'
import StockNavHeader from './StockNavHeader'
import StockTabView from './StockTabView'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '@emotion/react'
import { StockStackParamList } from 'navigation/stacks/StockStack'

export default function Stock() {
  const { params } = useRoute<RouteProp<StockStackParamList, 'Stock'>>()
  const { top: insetTop } = useSafeAreaInsets()
  const { colors } = useTheme()

  return (
    <View style={{ flex: 1, paddingTop: insetTop, backgroundColor: colors.BG_DARK }}>
      <StockNavHeader symbol={params?.symbol} companyName={params?.companyName} />
      <StockTabView routeParams={params} />
    </View>
  )
}
