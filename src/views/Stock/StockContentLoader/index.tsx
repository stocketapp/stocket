import { Container } from '@components'
import { StockHeaderLoader } from './ContentLoaders'

export default function StockContentLoader() {
  return (
    <Container fullView safeAreaTop ph>
      <StockHeaderLoader />
    </Container>
  )
}
