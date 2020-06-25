// @flow
import React, { useCallback } from 'react'
import { Dimensions } from 'react-native'
import {
  VictoryLine,
  VictoryVoronoiContainer,
  VictoryChart,
  VictoryAxis,
  VictoryGroup,
} from 'victory-native'
import { GREEN } from 'utils/colors'
import exampleData from '../LineChart/exampleData'
import CursorLine from './CursorLine'

const { width } = Dimensions.get('window')

type Props = {
  data: [],
  x: string,
  y: string,
  chartProps?: {
    minDomain?: { y?: number, x?: number },
  },
  lineProps?: {},
  onEvent: (value: string | null) => void,
  labelText: string | number,
}

export default function ChartLine({
  data = exampleData,
  x = 'date',
  y = 'value',
  chartProps,
  lineProps,
  onEvent,
  labelText = x,
}: Props) {
  return (
    <VictoryChart
      {...chartProps}
      containerComponent={
        <VictoryVoronoiContainer
          voronoiDimension="x"
          // $FlowFixMe
          labelComponent={
            <CursorLine onEvent={onEvent} labelText={labelText} />
          }
          labels={({ datum }) => datum[labelText]}
          onDeactivated={() => onEvent(null)}
        />
      }
      padding={styles.victoryChart}
    >
      <VictoryGroup data={data} x={x} y={y}>
        <VictoryLine
          {...lineProps}
          interpolation="basis"
          x={x}
          y={y}
          width={width}
          style={styles.victoryLine}
        />
        <VictoryAxis style={styles.victoryAxis} />
      </VictoryGroup>
    </VictoryChart>
  )
}

const styles = {
  victoryLine: {
    data: {
      stroke: GREEN,
    },
    labels: {
      stroke: GREEN,
    },
  },
  victoryAxis: { tickLabels: { display: 'none' } },
  victoryChart: { top: 30, bottom: -0.2 },
}
