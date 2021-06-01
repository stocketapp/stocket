import { View } from 'react-native'
import { useRoute } from '@react-navigation/core'
import StockNavHeader from './StockNavHeader'
import StockTabView from './StockTabView'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '@emotion/react'

export default function Stock() {
  const { params }: any = useRoute()
  const { top: insetTop } = useSafeAreaInsets()
  const { colors } = useTheme()

  return (
    <View style={{ flex: 1, paddingTop: insetTop, backgroundColor: colors.BG_DARK }}>
      <StockNavHeader symbol={params?.symbol} companyName={params?.companyName} />
      <StockTabView routeParams={params} />
    </View>
  )
}
