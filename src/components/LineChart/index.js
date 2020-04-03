import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native'
import { Svg, Path, Line } from 'react-native-svg'
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import * as format from 'd3-format'
import * as axis from 'd3-axis'
import { scaleBand, scaleLinear, scaleTime } from 'd3-scale'
import * as path from 'svg-path-properties'

const d3 = {
  scale,
  shape,
  format,
  axis,
}
const height = 300
const { width } = Dimensions.get('window')
const verticalPadding = 30

const data = [
  { x: new Date(2020, 1, 1), y: 2100 },
  { x: new Date(2020, 2, 1), y: 3100 },
  { x: new Date(2020, 3, 1), y: 5100 },
  { x: new Date(2020, 4, 1), y: 6100 },
  { x: new Date(2020, 5, 1), y: 9100 },
  { x: new Date(2020, 6, 1), y: 21000 },
  { x: new Date(2020, 7, 1), y: 14000 },
  { x: new Date(2020, 8, 1), y: 21000 },
  { x: new Date(2020, 9, 1), y: 31000 },
  { x: new Date(2020, 10, 1), y: 50100 },
  { x: new Date(2020, 11, 1), y: 70100 },
  { x: new Date(2020, 12, 1), y: 90100 },
]

const scaleX = scaleTime()
  .domain([new Date(2020, 1, 1), new Date(2020, 12, 1)])
  .range([0, width])

const scaleY = scaleLinear()
  .domain([0, 90100])
  .range([height - verticalPadding, verticalPadding])

const line = d3.shape
  .line()
  .x(d => scaleX(d.x))
  .y(d => scaleY(d.y))
  .curve(d3.shape.curveBasis)(data)
const lineProperties = path.svgPathProperties(line)
const lineLength = lineProperties.getTotalLength()

export default function LineChart() {
  // const [positionX] = useState(new Animated.Value(0))
  const [positionX, setPositionX] = useState(0)
  // const [showLine, setShowLine] = useState(false)
  const cursor = useRef()
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, state) => {
        setPositionX(state.moveX)
        // setShowLine(true)
      },
      onPanResponderMove: (e, state) => {
        setPositionX(state.moveX)
      },
    }),
  ).current

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Svg {...{ width, height }}>
        <Path d={line} fill="transparent" stroke="red" strokeWidth="2" />
        <Line
          x1={positionX}
          y1="0"
          x2={positionX}
          y2={height}
          stroke="red"
          strokeWidth="1"
        />
        <View ref={cursor} style={styles.cursor} />
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height,
    width,
  },
  cursor: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
})
