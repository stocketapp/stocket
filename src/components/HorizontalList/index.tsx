import { FlatList, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Text, Container } from '@components'
import ListItem from './ListItem'
import EmptyPlaceholder from './EmptyPlaceholder'
import { listStyle, listContentStyle, listEmptyStyle } from './styles'
import { useTheme } from '@emotion/react'
import { AppStackNavigationProps } from 'navigation/AppStack'
import { IEXQuote, PositionType } from 'types'

const HorizontalList = ({ data, title }: HorizontalListProps) => {
  const { navigate } = useNavigation<AppStackNavigationProps>()
  const { p } = useTheme()

  const goToStock = (quote: IEXQuote | PositionType) => {
    navigate('StockStack', {
      screen: 'Stock',
      params: {
        symbol: quote?.symbol,
        companyName: quote?.companyName,
        logo: quote?.logo,
      },
    })
  }

  return (
    <Container top={p.xxlg}>
      <Container horizontal separate>
        <Text type="heading" weight="Black">
          {title}
        </Text>
      </Container>

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ListItem item={item} onPress={() => goToStock(item)} />
        )}
        keyExtractor={(_, key) => key.toString()}
        style={listStyle}
        horizontal
        contentContainerStyle={listContentStyle}
        ListEmptyComponent={() => (
          <View style={listEmptyStyle}>
            <EmptyPlaceholder />
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  )
}

export default HorizontalList

export interface HorizontalListProps {
  data: (IEXQuote | PositionType)[]
  title: string
}
