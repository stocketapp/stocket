import { Container, MarketStatus, Balance } from '@components'
import { WatchlistList } from './Watchlist'
import { HeaderContainer, StatusContainer } from './styles'
import useHomeHook from './hooks/useHomeHook'
import PortfolioPositions from './PortfolioPositions'

export default function Home() {
  const { portfolio, watchlist } = useHomeHook()

  return (
    <Container fullView scrollable>
      <Container ph>
        <HeaderContainer>
          <StatusContainer>
            <MarketStatus />
          </StatusContainer>
          <Balance {...portfolio} />
        </HeaderContainer>
        <PortfolioPositions positions={portfolio?.positions} />
        <WatchlistList data={watchlist} />
      </Container>
    </Container>
  )
}
