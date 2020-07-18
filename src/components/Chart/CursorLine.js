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
  leftOffset: number,
  rightOffset: number,
}

export default function LabelCursor({
  x,
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
    })
  }, [datum?.change, datum?.changePct, datum?.value, onEvent])

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
        on
      />
      <Text fill={LABEL} x={textX} y={20}>
        {datum[labelText]}
      </Text>
    </G>
  )
}
