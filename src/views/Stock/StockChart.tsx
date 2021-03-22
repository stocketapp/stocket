import { VictoryLine, VictoryCursorContainer, LineSegment } from 'victory-native'
import { GREEN } from '@utils/colors'

export default function StockChart({ data }: StockPriceChart) {
  console.log(data)
  return (
    <VictoryLine
      padding={{ left: 0, top: 10 }}
      interpolation="natural"
      data={[
        { x: 1, y: 2 },
        { x: 2, y: 5 },
        { x: 3, y: 3 },
        { x: 4, y: 6 },
        { x: 5, y: 7 },
        { x: 6, y: 5 },
        { x: 7, y: 8 },
        { x: 8, y: 7 },
        { x: 9, y: 10 },
        { x: 10, y: 11 },
      ]}
      containerComponent={
        <VictoryCursorContainer
          cursorDimension="x"
          cursorComponent={<LineSegment style={{ stroke: '#4a4b4a6a', strokeWidth: 3 }} />}
        />
      }
      style={styles.victoryLine}
      maxDomain={{ y: 12 }}
      minDomain={{ x: 1 }}
    />
  )
}

interface StockPriceChart {
  data: {
    label: string
    close: number
    date: string
  }
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
