// @flow
import React from 'react'
import { Dimensions } from 'react-native'
import {
  VictoryLine,
  VictoryVoronoiContainer,
  VictoryChart,
  VictoryAxis,
} from 'victory-native'
import { GREEN } from 'utils/colors'
import exampleData from './LineChart/exampleData'

const { width } = Dimensions.get('window')

type Props = {
  data: [],
  x: string,
  y: string,
  chartProps?: {
    minDomain?: { y?: number, x?: number },
  },
  lineProps?: {},
}

export default function VictoryLineGraph({
  data = exampleData,
  x = 'label',
  y = 'value',
  chartProps,
  lineProps,
}: Props) {
  return (
    <VictoryChart
      {...chartProps}
      containerComponent={
        <VictoryVoronoiContainer
          voronoiDimension="x"
          labels={({ datum }) => `${datum.value}`}
          style={{
            label: {
              stroke: GREEN,
            },
          }}
        />
      }
      padding={{ top: 0, bottom: -0.2 }}
    >
      <VictoryLine
        {...lineProps}
        interpolation="basis"
        data={data}
        x={x}
        y={y}
        width={width}
        style={{
          data: {
            stroke: GREEN,
          },
          labels: {
            stroke: GREEN,
          },
        }}
      />
      <VictoryAxis label="" style={{ tickLabels: { display: 'none' } }} />
    </VictoryChart>
  )
}
