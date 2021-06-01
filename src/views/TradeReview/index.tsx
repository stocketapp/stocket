import { useRoute, useNavigation, RouteProp } from '@react-navigation/native'
import { Text, Container } from '@components'
import { TradeStackParamList } from 'navigation/stacks/TradeStack'
import { useTheme } from '@emotion/react'

export default function StockTradeModalReview() {
  const { colors, p } = useTheme()
  const { params } = useRoute<RouteProp<TradeStackParamList, 'TradeModalReview'>>()
  return (
    <Container
      fullView
      items="center"
      bgColor={colors.BG_DARK_CARD}
      safeAreaBottom
      top={p.xxlg}
    >
      <Text weight="Black" type="heading">
        Buy {params?.companyName}
      </Text>
      <Text>{params?.orderType}</Text>
    </Container>
  )
}
