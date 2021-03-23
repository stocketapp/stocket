import { Container } from '@components'
import StockContentLoader from './StockContentLoader'
import StockHeader from './StockHeader'
import StockChart from './StockChart'
import useStockHook from './hooks/useStockHooks'

export default function Stock() {
  const { quote, chart } = useStockHook()

  if (quote?.loading && chart?.loading && chart?.data?.length > 0) {
    return <StockContentLoader />
  }

  return (
    <Container fullView safeAreaTop useNavBar scrollable>
      <Container ph top={15}>
        <StockHeader {...quote?.data} />
      </Container>
      {chart?.data?.length > 0 && <StockChart data={chart?.data} />}
    </Container>
  )
}
