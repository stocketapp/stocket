// @flow
import React from 'react'
import { Dimensions } from 'react-native'
import {
  VictoryLine,
  VictoryVoronoiContainer,
  VictoryChart,
  VictoryAxis,
  VictoryGroup,
  VictoryLabel,
} from 'victory-native'
import { GREEN } from 'utils/colors'
import exampleData from '../LineChart/exampleData'
import CursorLine from './CursorLine'

const { width } = Dimensions.get('window')

type Props = {
  data: [],
  x?: string,
  y?: string,
  chartProps?: {
    minDomain?: { y?: number, x?: number },
  },
  lineProps?: {},
  onEvent?: (value: string | null) => void,
  labelText?: string | number,
  labelRightOffset?: number,
  labelLeftOffset?: number,
  onChartEvent: (value: string | number | null) => void,
}

export default function ChartLine({
  data = exampleData,
  x = 'date',
  y = 'value',
  chartProps,
  lineProps,
  onEvent = () => null,
  labelText = x,
  labelRightOffset = 80,
  labelLeftOffset = 40,
  onChartEvent,
}: Props) {
  return (
    <VictoryChart
      {...chartProps}
      padding={styles.victoryChart}
      containerComponent={
        <VictoryVoronoiContainer
          voronoiDimension="x"
          labelComponent={
            <CursorLine
              onEvent={onChartEvent}
              labelText={labelText}
              leftOffset={labelLeftOffset}
              rightOffset={labelRightOffset}
            />
          }
          labels={({ datum }) => datum[labelText]}
          onDeactivated={() => onChartEvent(null)}
          mouseFollowTooltips
          voronoiPadding={0}
        />
      }
    >
      <VictoryGroup data={data} x={x} y={y}>
        <VictoryLine
          {...lineProps}
          interpolation="basis"
          x={x}
          y={y}
          width={width}
          style={styles.victoryLine}
          labels={() => ''}
          labelComponent={<VictoryLabel />}
        />
        <VictoryAxis style={styles.victoryAxis} height={0} width={0} label="" />
        <VictoryAxis style={styles.victoryAxis} height={0} width={0} label="" />
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
      display: 'none',
    },
  },
  victoryAxis: { tickLabels: { display: 'none', fill: 'none' } },
  victoryChart: { top: 30, bottom: 0 },
}
