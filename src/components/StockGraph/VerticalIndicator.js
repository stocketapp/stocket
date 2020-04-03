import React from 'react'
import { Line, G, Text } from 'react-native-svg'
import { GRAY_DARKER } from 'utils/colors'
import find from 'lodash.find'

export default ({ positionX, yValue, xValue, x, y, data }) => {
  // console.log(find(data, (el, i) => x(xValue) === positionX))
  console.log(x(xValue), positionX)
  return (
    <G>
      {/* <Text>{xValue}</Text> */}
      <Line
        x1={positionX}
        y1="20"
        x2={positionX}
        y2="320"
        stroke={GRAY_DARKER}
        strokeWidth="2"
      />
    </G>
  )
}
