import { useTheme } from '@emotion/react'
import { Container, Text } from '@components'
import { useNavigation } from '@react-navigation/native'
import WatchlistItem from './WatchlistItem'
import { WatchlistIexQuote } from './WatchlistItem'

export const WatchlistList = ({ data }: { data: WatchlistIexQuote[] }) => {
  const { navigate } = useNavigation()
  const { p } = useTheme()

  const onItemPress = (quote: WatchlistIexQuote) => {
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
      <Text type="heading" weight="Black">
        Watchlist
      </Text>
      {data?.map((el: WatchlistIexQuote, i: number) => (
        <WatchlistItem item={el} onPress={onItemPress} key={i} />
      ))}
    </Container>
  )
}
