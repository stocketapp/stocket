import { useEffect, useState } from 'react'
import { Container } from '@components'
import StockContentLoader from './StockContentLoader'
import StockHeader from './StockHeader'
import StockChart from './StockChart'
import useStockHook from './hooks/useStockHooks'
import { useRoute } from '@react-navigation/core'

export default function Stock() {
  const { params }: any = useRoute()
  const { quote, chart } = useStockHook(params?.symbol)
  const [renderChart, setRenderChart] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRenderChart(true)
    }, 300)

    return () => {
      clearTimeout(timeout)
      setRenderChart(false)
    }
  }, [])

  if (quote?.loading && chart?.loading && chart?.data?.length > 0) {
    return <StockContentLoader />
  }

  return (
    <Container fullView useNavBar scrollable>
      <Container ph top={15}>
        <StockHeader {...quote?.data} />
      </Container>
      {chart?.data?.length > 0 && renderChart && <StockChart data={chart?.data} />}
    </Container>
  )
}
