import { FlatList, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Text, Container } from '@components'
import PositionItem from './PortfolioPositionItem'
import PortfolioPositionsEmpty from './PortfolioPositionsEmpty'
import {
  portfolioListStyle,
  portfolioListContentStyle,
  portfolioListEmptyStyle,
} from './styles'
import { useTheme } from '@emotion/react'
import { AppStackNavigationProps } from 'navigation/AppStack'

const PortfolioPositions = ({ positions }: { positions: [PortfolioPositionType] }) => {
  const { navigate } = useNavigation<AppStackNavigationProps>()
  const { p } = useTheme()

  const goToStock = (quote: PortfolioPositionType) => {
    navigate('StockStack', {
      screen: 'Stock',
      params: {
        symbol: quote?.symbol,
        companyName: quote?.companyName,
        logo: quote?.logo,
        size: quote?.size,
      },
    })
  }

  return (
    <Container top={p.xxlg}>
      <Container horizontal separate>
        <Text type="heading" weight="Black">
          Positions
        </Text>
      </Container>

      <FlatList
        data={positions}
        renderItem={({ item }) => (
          <PositionItem item={item} onPress={() => goToStock(item)} />
        )}
        keyExtractor={(index, key) => key.toString()}
        style={portfolioListStyle}
        horizontal
        contentContainerStyle={portfolioListContentStyle}
        ListEmptyComponent={() => (
          <View style={portfolioListEmptyStyle}>
            <PortfolioPositionsEmpty />
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  )
}

export default PortfolioPositions

export interface PortfolioPositionType {
  logo: string
  change24h: number
  change24hPct: number
  symbol: string
  companyName: string
  size: number
}
