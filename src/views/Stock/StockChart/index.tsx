import { useState } from 'react'
import {
  ChartPathProvider,
  ChartYLabel,
  // @ts-ignore
} from '@rainbow-me/animated-charts'
import ChartPath from './ChartPath'
import ChartPrice from './ChartPrice'
import { Container } from '@components'
import { IEXQuote } from 'types'

export default function StockChart({ data, quote, originalData }: StockChartProps) {
  const [chartPrice, setChartPrice] = useState({})

  return (
    <>
      <ChartPathProvider data={{ points: data, smoothingStrategy: 'bezier' }}>
        <Container ph pv={15}>
          {/* <StockHeader {...quoteData} /> */}
          <ChartPrice {...quote} />
        </Container>
        <ChartPath />
        <ChartYLabel />
      </ChartPathProvider>
    </>
  )
}

interface StockChartProps {
  data: [{ x: number; y: number }]
  quote: IEXQuote
}
