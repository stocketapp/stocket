import { Container, MarketStatus, Balance, HorizontalList } from '@components'
import { useReactiveVar } from '@apollo/client'
import { useNavigation } from '@react-navigation/core'
import { isPortfolioLoadingVar } from '@cache'
import { AppStackNavigationProps } from 'navigation/AppStack'
import { WatchlistList } from './Watchlist'
import { HeaderContainer, StatusContainer } from './styles'
import useHomeHook from './hooks/useHomeHook'
import BriefcaseSVG from '@svg/briefcase.svg'

export default function Home() {
  const { portfolio, watchlist } = useHomeHook()
  const isPortfolioLoading = useReactiveVar(isPortfolioLoadingVar)
  const { navigate } = useNavigation<AppStackNavigationProps>()

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
        emptyOnPress={() => navigate('TabStack', { screen: 'Search' })}
        emptyText="Start Investing"
        emptySvg={<BriefcaseSVG opacity={0.4} />}
      />
      <WatchlistList data={watchlist} />
    </Container>
  )
}
