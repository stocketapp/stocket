import { Container } from '@components'
import { StockHeaderLoader } from './Loaders'

export default function StockContentLoader() {
  return (
    <Container fullView safeAreaTop ph>
      <StockHeaderLoader />
    </Container>
  )
}
