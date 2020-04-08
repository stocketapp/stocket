import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Svg, Path } from 'react-native-svg'
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import * as format from 'd3-format'
import * as axis from 'd3-axis'
import { scaleLinear, scaleTime } from 'd3-scale'
import Cursor from './Cursor'
import { GREEN } from 'utils/colors'
import maxBy from 'lodash.maxby'
import minBy from 'lodash.minby'
import moment from 'moment'
import exampleData from './exampleData'

const d3 = {
  scale,
  shape,
  format,
  axis,
}
const height = 300
const { width } = Dimensions.get('window')
const verticalPadding = 30

export default function LineChart({ data = exampleData }) {
  const minX = minBy(data, el => moment(el.label, 'LT'))
  const maxX = maxBy(data, el => moment(el.label, 'LT'))
  const minY = minBy(data, el => el.value)
  const maxY = maxBy(data, el => el.value)
  const scaleX = scaleTime()
    .domain([moment(minX.label, 'LT'), moment(maxX.label, 'LT')])
    .range([0, width])
  const scaleY = scaleLinear()
    .domain([minY.value, maxY.value])
    .range([height - verticalPadding, verticalPadding])
  const line = d3.shape
    .line()
    .x(d => scaleX(moment(d.label, 'LT')))
    .y(d => scaleY(d.value))
    .curve(d3.shape.curveBasis)(data)
  const values = data.map(el => el.value)

  return (
    <View style={styles.container}>
      <Svg {...{ width, height }}>
        <Path d={line} fill="transparent" stroke={GREEN} strokeWidth="2" />
      </Svg>
      <View style={{ ...StyleSheet.absoluteFill, width }}>
        <Cursor
          d={line}
          scaleY={scaleY}
          minY={minY}
          maxY={maxY}
          values={values}
        />
      </View>
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
