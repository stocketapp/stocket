import {} from 'react-native'
import { Container } from '@components'
// import StockContentLoader from './StockContentLoader'
import { useQuery } from '@apollo/client'
import { SYMBOL_QUOTE_QUERY, SYMBOL_CHART_QUERY } from './queries'
import { IEXQuote } from 'types'
import StockHeader from './StockHeader'
import StockChart from './StockChart'

export default function Stock() {
  const { data } = useQuery(SYMBOL_QUOTE_QUERY, { variables: { symbol: 'AAPL' } })
  const { data: chartData } = useQuery(SYMBOL_CHART_QUERY, { variables: { symbol: 'AAPL' } })

  const quote: IEXQuote = data?.quote
  return (
    <Container fullView safeAreaTop ph>
      <StockHeader {...quote} />
      <StockChart data={chartData} />
    </Container>
  )
}
