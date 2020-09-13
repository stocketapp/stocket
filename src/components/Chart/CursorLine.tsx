import React, { useEffect } from 'react'
import { Dimensions } from 'react-native'
import { LABEL } from 'utils/colors'
import { Line, G, Text } from 'react-native-svg'
import type { CursorLineProps } from 'types'

const { width } = Dimensions.get('window')

export default function LabelCursor({
  x = 0,
  scale,
  datum,
  onEvent,
  labelText,
  leftOffset,
  rightOffset,
}: CursorLineProps) {
  const range = scale?.y?.range()
  let textX = x

  if (x < 20) {
    textX = x + 5
  } else if (x > width - leftOffset) {
    textX = x - rightOffset
  } else {
    textX = x - leftOffset
  }

  useEffect(() => {
    onEvent({
      change: datum?.change,
      changePct: datum?.changePct,
      value: datum?.value,
      date: datum?.date,
    })
  }, [datum?.change, datum?.changePct, datum?.value, onEvent, datum?.date])

  return (
    <G>
      <Line
        x1={x}
        x2={x}
        y1={Math.max(...range)}
        y2={Math.min(...range)}
        stroke={LABEL}
        strokeWidth={2}
        strokeOpacity={0.3}
      />
      <Text fill={LABEL} x={textX} y={20}>
        {datum[labelText]}
      </Text>
    </G>
  )
}
