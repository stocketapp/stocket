import { VictoryLine, VictoryCursorContainer, LineSegment } from 'victory-native'
import { GREEN } from '@utils/colors'

export default function StockChart({ data }: { data: StockPriceChartItemType[] }) {
  console.log(data)
  return (
    <VictoryLine
      padding={{ left: 0, top: 15, bottom: -10 }}
      domainPadding={{ x: 0, y: 25 }}
      interpolation="natural"
      x="label"
      y="close"
      data={data}
      containerComponent={
        <VictoryCursorContainer
          cursorDimension="x"
          cursorComponent={<LineSegment style={{ stroke: '#4a4b4a6a', strokeWidth: 3 }} />}
        />
      }
      style={styles.victoryLine}
    />
  )
}

export interface StockPriceChartItemType {
  label: string
  close: number
  date: string
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
  victoryAxis: {
    axis: {
      stroke: 'none',
    },
    ticks: { stroke: 'transparent' },
    tickLabels: { display: 'none', fill: 'none' },
  },
  victoryChart: { top: 30, bottom: -0.5 },
}
