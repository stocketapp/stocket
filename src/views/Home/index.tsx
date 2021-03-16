import { ScrollView } from 'react-native'
import { Container, MarketStatus, Balance } from '@components'
import { WatchlistList } from './Watchlist'
import { HeaderContainer, StatusContainer } from './styles'
import useHomeHook from './hooks/useHomeHook'
import PortfolioPositions from './PortfolioPositions'

export default function Home() {
  const { portfolio, watchlist } = useHomeHook()

  return (
    <Container fullView safeAreaTop ph>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <HeaderContainer>
          <StatusContainer>
            <MarketStatus />
          </StatusContainer>
          <Balance {...portfolio} />
        </HeaderContainer>
        <PortfolioPositions positions={portfolio?.positions} />
        <WatchlistList data={watchlist} />
      </ScrollView>
    </Container>
  )
}
