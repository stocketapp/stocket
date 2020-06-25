import React from 'react'
import { Dimensions } from 'react-native'
import { SUB_BACKGROUND, LABEL } from 'utils/colors'
import { Line, G, Text } from 'react-native-svg'

const { width } = Dimensions.get('window')

type CursorLineProps = {
  x: number,
  scale: any,
  datum: any,
}

export default function LabelCursor({ x, scale, datum }: CursorLineProps) {
  const range = scale.y.range()
  let textX = x

  if (x < 20) {
    textX = x + 5
  } else if (x > width - 40) {
    textX = x - 80
  } else {
    textX = x - 40
  }

  return (
    <G>
      <Line
        x1={x}
        x2={x}
        y1={Math.max(...range)}
        y2={Math.min(...range)}
        stroke={SUB_BACKGROUND}
        strokeWidth={2}
        strokeOpacity={0.8}
      />
      <Text fill={LABEL} x={textX} y={20}>
        {datum?.date}
      </Text>
    </G>
  )
}
