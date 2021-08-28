import { Container, MarketStatus, Balance, HorizontalList } from '@components'
import { WatchlistList } from './Watchlist'
import { HeaderContainer, StatusContainer } from './styles'
import useHomeHook from './hooks/useHomeHook'

export default function Home() {
  const { portfolio, watchlist } = useHomeHook()

  return (
    <Container fullView scrollable safeAreaTop ph>
      <HeaderContainer>
        <StatusContainer>
          <MarketStatus />
        </StatusContainer>
        <Balance {...portfolio} />
      </HeaderContainer>
      <HorizontalList title="Positions" data={portfolio?.positions} isPosition />
      <WatchlistList data={watchlist} />
    </Container>
  )
}
