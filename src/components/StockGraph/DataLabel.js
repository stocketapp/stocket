import React from 'react'
import { Text } from 'react-native-svg'

export default function DataLabel({
  positionX,
  yValue,
  xValue,
  data,
  positionY,
  x,
}) {
  // console.log(x(xValue))
  return (
    <Text x={positionX} y="20" fill="red">
      {xValue}
    </Text>
  )
}
