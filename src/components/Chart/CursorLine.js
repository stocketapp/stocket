import React, { useCallback, useEffect } from 'react'
import { Dimensions } from 'react-native'
import { SUB_BACKGROUND, LABEL } from 'utils/colors'
import { Line, G, Text } from 'react-native-svg'

const { width } = Dimensions.get('window')

type CursorLineProps = {
  x: number,
  scale: any,
  datum: any,
  onEvent: (value: string) => void,
  labelText: string | number,
}

export default function LabelCursor({
  x,
  scale,
  datum,
  onEvent,
  labelText,
}: CursorLineProps) {
  const range = scale.y.range()
  let textX = x

  if (x < 20) {
    textX = x + 5
  } else if (x > width - 40) {
    textX = x - 80
  } else {
    textX = x - 40
  }

  const onEventCallback = useCallback(() => onEvent(datum?.value), [
    datum?.value,
    onEvent,
  ])

  onEventCallback()

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
        on
      />
      <Text fill={LABEL} x={textX} y={20}>
        {datum[labelText]}
      </Text>
    </G>
  )
}
