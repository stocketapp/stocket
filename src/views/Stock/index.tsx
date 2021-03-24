import { TouchableOpacity } from 'react-native'

export default function Stock() {
  const { useEffect, useState } = require('react')
  const { Container, AddToWatchlistButton } = require('@components')
  const { useRoute, useNavigation } = require('@react-navigation/core')
  const { ArrowLeftIcon } = require('@icons')
  const StockContentLoader = require('./StockContentLoader')
  const StockHeader = require('./StockHeader').default
  const StockChart = require('./StockChart').default
  const useStockHook = require('./hooks/useStockHook').default
  const { useTheme } = require('@emotion/react')

  const { params }: any = useRoute()
  const { quote, chart } = useStockHook(params && params?.symbol)
  const [renderChart, setRenderChart] = useState(false)
  const { colors } = useTheme()
  const { goBack } = useNavigation()

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
      <Container ph separate horizontal>
        <TouchableOpacity style={{ paddingVertical: 5, paddingRight: 5 }} onPress={goBack}>
          <ArrowLeftIcon size={34} color={colors.GREEN} />
        </TouchableOpacity>
        <AddToWatchlistButton symbol={params?.symbol} />
      </Container>

      <Container ph top={15}>
        <StockHeader {...quote?.data} />
      </Container>
      {chart?.data?.length > 0 && renderChart && <StockChart data={chart?.data} />}
    </Container>
  )
}
