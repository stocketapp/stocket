import { View, useWindowDimensions } from 'react-native'
import Animated, {
  useDerivedValue,
  interpolate,
  // useAnimatedStyle,
} from 'react-native-reanimated'
import { ReText, round, Vector } from 'react-native-redash'
import { css } from '@emotion/native'
import theme from '@theme'
import Text from '../Text'
import { useMemo } from 'react'

export default function ChartHeader({
  data,
  translation,
  defaultValues,
  active,
}: ChartHeaderProps) {
  const { width } = useWindowDimensions()
  const { y } = translation
  const price = useDerivedValue(() => {
    const value = !active.value
      ? defaultValues.price
      : interpolate(y.value, [width, 0], [data.domainY[0], data.domainY[1]])
    return `$${round(value, 2).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })}`
  })
  // const change = useDerivedValue(() => {
  //   const theChange = !active.value
  //     ? defaultValues.change
  //     : interpolate(y.value, [width, 0], [data.domainY2[0], data.domainY2[1]])
  //   const value = round(theChange * 100, 2)
  //   const plus = value > 0 ? '+' : ''
  //   return `${plus}${value}%`
  // })
  // const color = useDerivedValue(() => {
  //   const num = Number(change.value.replace(/[+%]/g, ''))
  //   return num > 0 ? theme.colors.GREEN : num < 0 ? theme.colors.RED : theme.colors.GRAY
  // })
  const isPositive = defaultValues.change > 0
  const color = isPositive ? 'GREEN' : defaultValues.change < 0 ? 'RED' : 'WHITE'

  const change = useMemo(
    () => (defaultValues.change * 100).toFixed(2),
    [defaultValues.change],
  )

  // const style = useAnimatedStyle(() => ({
  //   fontFamily: 'SFProText-Medium',
  //   fontSize: 20,
  //   color: color.value,
  // }))

  return (
    <View style={{ paddingHorizontal: theme.spacing.screen }}>
      <ReText text={price} style={priceStyles} />
      {/* <ReText text={change} style={style} /> */}
      <Text color={color} type="title" weight="Medium" pb={10}>
        {change}
      </Text>
    </View>
  )
}

const priceStyles = css({
  fontFamily: 'SFProText-Black',
  fontSize: 40,
  color: '#fff',
})

interface ChartHeaderProps {
  data: {
    domainX: number[]
    domainY: number[]
    domainY2?: number[]
  }
  translation: Vector<Animated.SharedValue<number>>
  active: Animated.SharedValue<boolean>
  defaultValues: {
    price: number
    change: number
  }
}
