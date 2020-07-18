// @flow
import React, { useMemo } from 'react'
import { Dimensions, View } from 'react-native'
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
import { minBy, maxBy } from 'lodash'

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
  const domainRange = useMemo(() => {
    const maxDomain = maxBy(data, 'value')?.value
    const minDomain = minBy(data, 'value')?.value
    return { minDomain, maxDomain }
  }, [data])

  return (
    <View style={{ paddingTop: 10 }}>
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
            interpolation="bundle"
            x={x}
            y={y}
            width={width}
            style={styles.victoryLine}
            labels={() => ''}
            labelComponent={<VictoryLabel />}
            animate={{ duration: 200 }}
            maxDomain={domainRange?.maxDomain * 1.1}
            minDomain={domainRange?.minDomain * 1.1}
          />
        </VictoryGroup>
      </VictoryChart>
    </View>
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
  victoryChart: { top: 30, bottom: 10 },
}
