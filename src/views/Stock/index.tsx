export default function Stock() {
  const { Container } = require('@components')
  const { useRoute } = require('@react-navigation/core')
  const StockContentLoader = require('./StockContentLoader').default
  const StockHeader = require('./StockHeader').default
  const StockChart = require('./StockChart').default
  const useStockHook = require('./hooks/useStockHook').default
  const StockNavHeader = require('./StockNavHeader').default

  const { params }: any = useRoute()
  const { quote: quoteData, chart } = useStockHook(params && params?.symbol)
  const quote = quoteData?.data

  if (quote?.loading || chart?.loading) {
    return <StockContentLoader />
  }

  return (
    <Container fullView scrollable>
      <StockNavHeader symbol={params?.symbol} companyName={quote?.companyName} />

      <Container ph top={15}>
        <StockHeader {...quote} />
      </Container>
      {chart?.data?.length > 0 && <StockChart data={chart?.data} />}
    </Container>
  )
}
