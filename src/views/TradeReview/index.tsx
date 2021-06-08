import { useRoute, useNavigation, RouteProp } from '@react-navigation/native'
import { Text, Container, Button } from '@components'
import { TradeStackParamList } from 'navigation/stacks/TradeStack'
import { useTheme } from '@emotion/react'
import { DetailContainer } from './styles'
import { formatNumber, formatCurrency } from '@utils/functions'
import { ArrowLeftIcon } from '@icons'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import { useState } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import LottieView from 'lottie-react-native'

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
  const [loading, setLoading] = useState<boolean>(false)
  const [finalized, setFinalized] = useState<boolean>(false)
  const [mountAnimation, setMountAnimation] = useState(false)
  const { width: WINDOW_WIDTH } = useWindowDimensions()
  const opacity = useSharedValue(1)
  const offset = useSharedValue(0)
  const doneOffset = useSharedValue(-WINDOW_WIDTH)
  const doneOpacity = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(opacity.value),
    transform: [
      {
        translateX: withTiming(offset.value, { duration: 500 }),
      },
    ],
  }))

  const doneAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(doneOffset.value, { duration: 300 }) }],
    opacity: withTiming(doneOpacity.value, { duration: 800 }),
  }))

  const finalizeTrade = () => {
    setLoading(true)
    opacity.value = 0
    offset.value = 500
    doneOffset.value = 0
    doneOpacity.value = 1
    setMountAnimation(true)
    setFinalized(true)
  }

  return (
    <Container
      fullView
      items="center"
      bgColor={colors.BG_DARK_CARD}
      safeAreaBottom
      top={p.lg}
      separate
    >
      {!loading && !finalized && (
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
      )}
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
          <Detail label="Quantity" value={formatNumber(params?.size)} />
          <Detail label="Price" value={formatCurrency(params?.price)} />
          <Detail label="Total" value={formatCurrency(params?.total)} />
        </Container>
      </Animated.View>

      <Animated.View
        style={[
          {
            width: '100%',
            alignItems: 'center',
            marginBottom: '60%',
            paddingHorizontal: '10%',
          },
          doneAnimatedStyle,
        ]}
      >
        {mountAnimation && (
          <LottieView
            source={require('@assets/lottie/loading-checkmark2.json')}
            style={{ height: 170, width: 170 }}
            autoPlay
            loop={false}
          />
        )}
        <Text type="title" numberOfLines={3} style={{ textAlign: 'center' }}>
          Succesfully purchased{' '}
          <Text type="title" weight="Bold">
            {params?.size}
          </Text>{' '}
          shares of{' '}
          <Text type="title" weight="Bold">
            {params?.symbol}{' '}
          </Text>
          for{' '}
          <Text type="title" weight="Bold">
            {formatCurrency(params?.total)}
          </Text>
        </Text>
      </Animated.View>

      <Button label={finalized ? 'Done' : params?.orderType} onPress={finalizeTrade} />
    </Container>
  )
}
