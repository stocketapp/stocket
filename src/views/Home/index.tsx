import { Container, MarketStatus, Balance, HorizontalList } from '@components'
import { WatchlistList } from './Watchlist'
import { HeaderContainer, StatusContainer } from './styles'
import useHomeHook from './hooks/useHomeHook'

import { isPortfolioLoadingVar } from '@cache'
import { useReactiveVar } from '@apollo/client'
export default function Home() {
  const { portfolio, watchlist } = useHomeHook()
  const isPortfolioLoading = useReactiveVar(isPortfolioLoadingVar)

  return (
    <Container fullView scrollable safeAreaTop ph>
      <HeaderContainer>
        <StatusContainer>
          <MarketStatus />
        </StatusContainer>
        <Balance {...portfolio} />
      </HeaderContainer>
      <HorizontalList
        title="Positions"
        data={portfolio?.positions}
        isPosition
        loading={isPortfolioLoading}
      />
      <WatchlistList data={watchlist} />
    </Container>
  )
}
