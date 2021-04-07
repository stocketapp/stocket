export default function Stock() {
  const { useEffect, useState } = require('react')
  const { Container } = require('@components')
  const { useRoute } = require('@react-navigation/core')
  const StockContentLoader = require('./StockContentLoader')
  const StockHeader = require('./StockHeader').default
  const StockChart = require('./StockChart').default
  const useStockHook = require('./hooks/useStockHook').default
  const StockNavHeader = require('./StockNavHeader').default

  const { params }: any = useRoute()
  const { quote, chart } = useStockHook(params && params?.symbol)
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
    <Container fullView scrollable>
      <StockNavHeader symbol={params?.symbol} companyName={quote?.data?.companyName} />

      <Container ph top={15}>
        <StockHeader {...quote?.data} />
      </Container>
      {chart?.data?.length > 0 && renderChart && <StockChart data={chart?.data} />}
    </Container>
  )
}
