import { FlatList, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Text, Container } from '@components'
import EmptyPlaceholder from './EmptyPlaceholder'
import { listStyle, listContentStyle, listEmptyStyle } from './styles'
import { useTheme } from '@emotion/react'
import { AppStackNavigationProps } from 'navigation/AppStack'
import { IEXQuote, PositionType } from 'types'
import ListItem from './ListItem'
import PositionItem from './PositionItem'
import HorizontalListLoader from './HorizontalListLoader'

const HorizontalList = ({
  data,
  title,
  isPosition = false,
  loading,
  emptySvg,
  emptyText,
  emptyOnPress,
}: HorizontalListProps) => {
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
      {data?.length > 0 && (
        <Container horizontal separate>
          <Text type="heading" weight="Black">
            {title}
          </Text>
        </Container>
      )}

      {!loading ? (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <>
              {isPosition ? (
                <PositionItem
                  item={item as PositionType}
                  onPress={() => goToStock(item)}
                />
              ) : (
                <ListItem item={item as IEXQuote} onPress={() => goToStock(item)} />
              )}
            </>
          )}
          keyExtractor={(_, key) => key.toString()}
          style={listStyle}
          horizontal
          contentContainerStyle={listContentStyle}
          ListEmptyComponent={() => (
            <View style={listEmptyStyle}>
              <EmptyPlaceholder text={emptyText} svg={emptySvg} onPress={emptyOnPress} />
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <HorizontalListLoader />
      )}
    </Container>
  )
}

export default HorizontalList

export interface HorizontalListProps {
  data: (IEXQuote | PositionType)[]
  title: string
  isPosition?: boolean
  loading?: boolean
  emptySvg?: any
  emptyText?: string
  emptyOnPress?: () => void
}
