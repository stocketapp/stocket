import { useRoute, useNavigation, RouteProp } from '@react-navigation/native'
import { Text, Container, Button } from '@components'
import { TradeStackParamList } from 'navigation/stacks/TradeStack'
import { useTheme } from '@emotion/react'
import { DetailContainer } from './styles'
import { formatNumber, formatCurrency } from '@utils/functions'
import { ArrowLeftIcon } from '@icons'
import { TouchableOpacity } from 'react-native'

const Detail = ({ label, value }: { label: string; value: string }) => (
  <DetailContainer>
    <Text type="heading" color="GRAY">
      {label}
    </Text>
    <Text type="heading" weight="Bold">
      {value}
    </Text>
  </DetailContainer>
)

export default function StockTradeModalReview() {
  const { colors, p } = useTheme()
  const { params } = useRoute<RouteProp<TradeStackParamList, 'TradeModalReview'>>()
  const { goBack } = useNavigation()

  return (
    <Container
      fullView
      items="center"
      bgColor={colors.BG_DARK_CARD}
      safeAreaBottom
      top={p.lg}
      separate
    >
      <Container
        horizontal
        bgColor={colors.BG_DARK_CARD}
        items="center"
        content="center"
        ph
      >
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: p.xlg,
            paddingVertical: p.sm,
          }}
          onPress={goBack}
        >
          <ArrowLeftIcon size={34} color={colors.GREEN} />
        </TouchableOpacity>
        <Text weight="Black" type="heading">
          Buy {params?.symbol}
        </Text>
      </Container>
      <Container bgColor={colors.BG_DARK_CARD} bottom={200} ph>
        <Detail label="Quantity" value={formatNumber(params?.size)} />
        <Detail label="Price" value={formatCurrency(params?.price)} />
        <Detail label="Total" value={formatCurrency(params?.total)} />
      </Container>

      <Button label={params?.orderType} />
    </Container>
  )
}
