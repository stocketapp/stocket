// @ts-ignore
import { ChartPathProvider } from '@rainbow-me/animated-charts'
import ChartPath from './ChartPath'
import ChartPrice from './ChartPrice'
import { Container } from '@components'
import { IEXQuote } from 'types'

export default function StockChart({ data, quote }: StockChartProps) {
  return (
    <>
      <ChartPathProvider data={{ points: data, smoothingStrategy: 'bezier' }}>
        <Container ph pv={15}>
          <ChartPrice {...quote} />
        </Container>
        <ChartPath />
      </ChartPathProvider>
    </>
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
