import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Text, Container } from '@components'
import { formatNumber, formatCurrency } from '@utils/functions'
import { useTheme } from '@emotion/react'
import { useEffect } from 'react'
import { DetailContainer } from './styles'

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

const ReviewDetails = ({ quantity, price, total, animate }: ReviewDetailsProps) => {
  const opacity = useSharedValue(1)
  const offset = useSharedValue(0)
  const { colors } = useTheme()

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(opacity.value),
    transform: [
      {
        translateX: withTiming(offset.value, { duration: 600 }),
      },
    ],
  }))

  useEffect(() => {
    if (animate) {
      opacity.value = 0
      offset.value = 500
    }
  }, [animate, offset, opacity])

  return (
    <Animated.View
      style={[
        {
          width: '100%',
          flex: 1,
          height: '100%',
        },
        animatedStyle,
      ]}
    >
      <Container bgColor={colors.BG_DARK_CARD} ph top={80}>
        <Detail label="Quantity" value={formatNumber(quantity)} />
        <Detail label="Price" value={formatCurrency(price)} />
        <Detail label="Total" value={formatCurrency(total)} />
      </Container>
    </Animated.View>
  )
}

export default ReviewDetails

export interface ReviewDetailsProps {
  symbol: string
  total: number
  quantity: number
  orderType: 'BUY' | 'SELL'
  price: number
  companyName: string
  animate: boolean
}
