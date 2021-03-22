import { ScrollView, Dimensions } from 'react-native'
import { Container, MarketStatus, Balance } from '@components'
import { WatchlistList } from './Watchlist'
import { HeaderContainer, StatusContainer } from './styles'
import useHomeHook from './hooks/useHomeHook'
import PortfolioPositions from './PortfolioPositions'

const { width } = Dimensions.get('window')

export default function Home() {
  const { portfolio, watchlist } = useHomeHook()

  return (
    <Container fullView>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 30, width: width }}
        showsVerticalScrollIndicator={false}
        directionalLockEnabled
      >
        <Container safeAreaTop ph>
          <HeaderContainer>
            <StatusContainer>
              <MarketStatus />
            </StatusContainer>
            <Balance {...portfolio} />
          </HeaderContainer>
          <PortfolioPositions positions={portfolio?.positions} />
          <WatchlistList data={watchlist} />
        </Container>
      </ScrollView>
    </Container>
  )
}
