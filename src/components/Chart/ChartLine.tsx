// @flow
import React, { useMemo } from 'react'
import { Dimensions, View } from 'react-native'
import {
  VictoryLine,
  VictoryVoronoiContainer,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryAxis,
} from 'victory-native'
import { GREEN } from 'utils/colors'
import exampleData from './exampleData'
import CursorLine from './CursorLine'
import { minBy, maxBy } from 'lodash'
import ChartRangeTabs from './ChartRangeTabs'
import type { ChartLineProps } from 'types/ChartTypes'

const { width } = Dimensions.get('window')

export default function ChartLine({
  data = exampleData,
  x = 'date',
  y = 'value',
  chartProps,
  lineProps,
  labelText = x,
  labelRightOffset = 80,
  labelLeftOffset = 40,
  onChartEvent,
  tabs = [],
  onTabPress,
  activeRangeTab,
}: ChartLineProps) {
  const domainRange = useMemo(() => {
    const maxX = maxBy(data, 'value')?.value
    const minX = minBy(data, 'value')?.value
    return { minX: minX === 0 ? -5 : minX, maxX }
  }, [data])

  return (
    <View style={{ paddingTop: 10 }}>
      <VictoryChart
        {...chartProps}
        padding={styles.victoryChart}
        domainPadding={{ y: [25, 5] }}
        domain={{ y: [domainRange.minX ?? 0, domainRange.maxX ?? 0 * 1.01] }}
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
          <VictoryAxis style={styles.victoryAxis} height={0} width={0} />
          <VictoryAxis style={styles.victoryAxis} height={0} width={0} />
        </VictoryGroup>
      </VictoryChart>
      {tabs?.length > 0 && (
        <ChartRangeTabs
          activeRangeTab={activeRangeTab}
          tabs={tabs}
          onTabPress={onTabPress}
        />
      )}
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
  victoryChart: { top: 30, bottom: -0.5 },
}
