// import { StockHeaderLoader } from './ContentLoaders'
import { View } from 'react-native'
import { useTheme } from '@emotion/react'

export default function StockContentLoader() {
  const { colors, p } = useTheme()
  return (
    <View style={{ backgroundColor: colors.BG_DARK, paddingHorizontal: p.lg }}>
      {/* <StockHeaderLoader /> */}
    </View>
  )
}
