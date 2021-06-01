// @ts-ignore
import { ChartPathProvider } from '@rainbow-me/animated-charts'
import ChartPathWithDot from './ChartPathWithDot'
import ChartPrice from './ChartPrice'
import { Container } from '@components'
import { IEXQuote } from 'types'
import StockChartRangeTabs, { GraphRange } from './StockChartRangeTabs'
import { useState } from 'react'

export default function StockChart({ data, quote }: StockChartProps) {
  const [range, setRange] = useState<GraphRange>('now')

  return (
    <ChartPathProvider
      data={{ points: data, smoothingStrategy: 'bezier', smoothingFactor: 1 }}
    >
      <Container ph pv={15}>
        <ChartPrice {...quote} />
      </Container>
      <ChartPathWithDot />
      <StockChartRangeTabs activeRangeTab={range} onTabPress={setRange} />
    </ChartPathProvider>
  )
}

export type ChartPointObject = {
  x: number
  y: number
}

interface StockChartProps {
  data: [ChartPointObject]
  quote: IEXQuote
}
