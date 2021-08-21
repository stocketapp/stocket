import { View, useWindowDimensions } from 'react-native'
import Animated, {
  useDerivedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { ReText, round, Vector } from 'react-native-redash'
import { css } from '@emotion/native'
import theme from '@theme'

export default function ChartHeader({
  data,
  translation,
  defaultValues,
  active,
}: ChartHeaderProps) {
  const { width } = useWindowDimensions()
  const { y, x } = translation
  const price = useDerivedValue(() => {
    const value = !active.value
      ? defaultValues.price
      : interpolate(y.value, [width, 0], [data.domainY[0], data.domainY[1]])
    return `$${round(value, 2).toLocaleString('en-US')}`
  })
  const change = useDerivedValue(() => {
    const theChange = !active.value
      ? defaultValues.change
      : interpolate(y.value, [width, 0], [data.domainY2[0], data.domainY2[1]])
    const value = round(theChange * 100, 2)
    const plus = value > 0 ? '+' : ''
    return `${plus}${value}%`
  })
  const color = useDerivedValue(() => {
    const num = Number(change.value.replace(/[+%]/g, ''))
    return num > 0 ? theme.colors.GREEN : num < 0 ? theme.colors.RED : theme.colors.GRAY
  })

  const label = useDerivedValue(() => {
    const value = interpolate(x.value, [0, width], [data.domainX[0], data.domainX[1]])
    const time = new Date(60000 * 60 + value)
    return !active.value
      ? 'Now'
      : time.toLocaleTimeString('en-US', {
          timeZone: 'America/New_York',
          timeStyle: 'short',
        })
  })

  const style = useAnimatedStyle(() => ({
    fontFamily: 'SFProText-Medium',
    fontSize: 20,
    color: color.value,
    paddingRight: 5,
  }))

  return (
    <View style={{ paddingHorizontal: theme.spacing.screen, paddingBottom: 20 }}>
      <ReText text={price} style={priceStyles} />
      <View style={changeContainer}>
        <ReText text={change} style={style} />
        <ReText text={label} style={{ color: theme.colors.GRAY, fontSize: 16 }} />
      </View>
    </View>
  )
}

const priceStyles = css({
  fontFamily: 'SFProText-Black',
  fontSize: 40,
  color: '#fff',
})
const changeContainer = css({
  flexDirection: 'row',
  alignItems: 'flex-end',
})

interface ChartHeaderProps {
  data: {
    domainX: number[]
    domainY: number[]
    domainY2: number[]
  }
  translation: Vector<Animated.SharedValue<number>>
  active: Animated.SharedValue<boolean>
  defaultValues: {
    price: number
    change: number
  }
}
