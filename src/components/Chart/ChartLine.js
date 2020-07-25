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

const { width } = Dimensions.get('window')

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
  tabs = [],
  onTabPress,
  activeRangeTab,
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
        domainPadding={{ y: 10 }}
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
            maxDomain={domainRange?.maxDomain * 1.1}
            minDomain={domainRange?.minDomain * 1.1}
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
  tabs: [string],
  onTabPress: (tab: string) => void,
  activeRangeTab: string,
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
