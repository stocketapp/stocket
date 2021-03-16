import { Container, Text } from '@components'
import WatchlistItem from './WatchlistItem'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { WatchlistIexQuote } from './WatchlistItem'
import { useTheme } from '@emotion/react'

export const WatchlistList = ({ data }: { data: WatchlistIexQuote[] }) => {
  const dispatch = useDispatch()
  const { navigate } = useNavigation()
  const { p } = useTheme()

  const onItemPress = (quote: WatchlistIexQuote) => {
    dispatch({
      type: 'SET_SELECTED_STOCK',
      selectedStock: quote?.symbol,
    })
    navigate('Stock')
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
