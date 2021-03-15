import React from 'react'
import { FlatList, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { Text, Container } from '@components'
import PositionItem from './PortfolioPositionItem'
import PortfolioPositionsEmpty from './PortfolioPositionsEmpty'
import { portfolioListStyle, portfolioListContentStyle, portfolioListEmptyStyle } from './styles'
import { useTheme } from '@emotion/react'

const PortfolioPositions = ({ positions }: { positions: [PortfolioPositionType] }) => {
  const { navigate } = useNavigation()
  const dispatch = useDispatch()
  const { p } = useTheme()

  const goToStock = (selectedStock: PortfolioPositionType) => {
    dispatch({
      type: 'SELECTED_STOCK_POSITION',
      selectedStockPosition: selectedStock,
    })
    dispatch({
      type: 'SET_SELECTED_STOCK',
      selectedStock: selectedStock?.symbol,
    })
    navigate('Stock')
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
        renderItem={({ item }) => <PositionItem item={item} onPress={() => goToStock(item)} />}
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
  change: number
  changePct: number
  symbol: string
}
