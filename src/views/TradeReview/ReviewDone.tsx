import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Text } from '@components'
import { formatCurrency } from '@utils/functions'
import { useEffect } from 'react'
import { useWindowDimensions } from 'react-native'
import LottieView from 'lottie-react-native'

const ReviewDone = ({ size, symbol, total, animate }: ReviewDoneProps) => {
  const { width: WINDOW_WIDTH } = useWindowDimensions()
  const offset = useSharedValue(-WINDOW_WIDTH)
  const opacity = useSharedValue(0)

  const doneAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(offset.value, { duration: 400 }) }],
    opacity: withTiming(opacity.value, { duration: 700 }),
  }))

  useEffect(() => {
    if (animate) {
      opacity.value = 1
      offset.value = 0
    }
  }, [animate, offset, opacity])

  return (
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
      {animate && (
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
          {size}
        </Text>{' '}
        shares of{' '}
        <Text type="title" weight="Bold">
          {symbol}{' '}
        </Text>
        for{' '}
        <Text type="title" weight="Bold">
          {formatCurrency(total)}
        </Text>
      </Text>
    </Animated.View>
  )
}

export default ReviewDone

export interface ReviewDoneProps {
  symbol: string
  total: number
  size: number
  orderType: 'BUY' | 'SELL'
  price: number
  companyName: string
  animate: boolean
}
