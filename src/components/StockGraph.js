import React, { useRef, useState } from 'react'
import { PanResponder, View } from 'react-native'
import { LineChart, Grid } from 'react-native-svg-charts'
import { Circle, G, Line, Rect, Text } from 'react-native-svg'
import * as shape from 'd3-shape'
import { GREEN, GRAY_DARKER } from 'utils/colors'
import find from 'lodash.find'

const HorizontalLine = ({ y }) => (
  <Line
    key={'zero-axis'}
    x1={'0%'}
    x2={'100%'}
    y1={y(50)}
    y2={y(50)}
    stroke={'grey'}
    strokeDasharray={[4, 8]}
    strokeWidth={2}
  />
)

const IndicatorLine = ({ positionX, positionY, x, y, yValue, ...props }) => {
  return (
    <Line
      x1={positionX}
      y1={0}
      x2={positionX}
      y2="200"
      stroke={GRAY_DARKER}
      strokeWidth="2"
    />
  )
}

export default function StockGraph({ data }) {
  const [positionX, setPositionX] = useState(0)
  const [positionY, setPositionY] = useState(0)
  const [showLine, setShowLine] = useState(false)
  const [yValue, setYValue] = useState(0)
  const [xValue, setXValue] = useState(0)

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, state) => {
        setPositionX(state.moveX)
        setPositionY(state.moveY)
        setShowLine(true)
      },
      onPanResponderMove: (e, state) => {
        setPositionX(state.moveX)
        setPositionY(state.moveY)
      },
      onPanResponderRelease: () => {
        setShowLine(false)
      },
    }),
  ).current

  const setYAccessor = ({ item, ...rest }) => {
    setYValue(item)
    return item.value
  }

  const setXAccessor = ({ index, ...rest }) => {
    setXValue(index)
    return index
  }

  return (
    <View {...panResponder.panHandlers}>
      <LineChart
        style={{ height: 200 }}
        data={data}
        svg={{
          stroke: GREEN,
          strokeWidth: 2,
        }}
        contentInset={{ top: 20, bottom: 20 }}
        curve={shape.curveNatural}
        yAccessor={setYAccessor}
        xAccessor={setXAccessor}
      >
        <HorizontalLine />
        {showLine && (
          <IndicatorLine
            positionX={positionX}
            positionY={positionY}
            xValue={xValue}
            yValue={yValue}
          />
        )}
      </LineChart>
    </View>
  )
}
