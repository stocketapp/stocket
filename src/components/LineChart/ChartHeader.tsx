import { View, useWindowDimensions } from 'react-native'
import Animated, { useDerivedValue, interpolate } from 'react-native-reanimated'
import { ReText, round } from 'react-native-redash'
import { css } from '@emotion/native'

export default function ChartHeader({ y, data }: ChartHeaderProps) {
  const { width } = useWindowDimensions()
  const price = useDerivedValue(() => {
    return `$${round(
      interpolate(y.value, [width, 0], [data.domainY[0], data.domainY[1]]),
      2,
    ).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })}`
  })

  return (
    <View>
      <ReText text={price} style={priceStyles} />
    </View>
  )
}

const priceStyles = css({
  fontFamily: 'SFProText-Black',
  fontSize: 40,
  color: '#fff',
})

interface ChartHeaderProps {
  y: Animated.SharedValue<number>
  data: {
    domainX: number[]
    domainY: number[]
  }
}
