import React from 'react'
import { Dimensions } from 'react-native'
import {
  VictoryLine,
  VictoryVoronoiContainer,
  VictoryChart,
  VictoryLabel,
} from 'victory-native'
import { GREEN } from 'utils/colors'
import exampleData from './LineChart/exampleData'

const { width } = Dimensions.get('window')

export default function VictoryLineGraph({ data = exampleData }) {
  return (
    <VictoryChart
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
      padding={{ top: 50, bottom: -0.5 }}
    >
      <VictoryLine
        interpolation="natural"
        data={data}
        x="label"
        y="value"
        width={width}
        style={{
          data: {
            stroke: GREEN,
          },
          labels: {
            stroke: GREEN,
          },
        }}
        labelComponent={<VictoryLabel style={{ display: 'none' }} />}
      />
    </VictoryChart>
  )
}
