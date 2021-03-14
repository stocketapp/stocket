import React from 'react'
import { Container, Text } from '@components'
import WatchlistItem from './WatchlistItem'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { WatchlistIexQuote } from './WatchlistItem'

export const WatchlistList = ({ data }: { data: WatchlistIexQuote[] }) => {
  const dispatch = useDispatch()
  const { navigate } = useNavigation()

  const onItemPress = (quote: WatchlistIexQuote) => {
    dispatch({
      type: 'SET_SELECTED_STOCK',
      selectedStock: quote?.symbol,
    })
    navigate('Stock')
  }

  return (
    <Container top={30}>
      <Text type="heading" weight="Heavy">
        Watchlist
      </Text>
      {data?.map((el: WatchlistIexQuote, i: number) => (
        <WatchlistItem item={el} onPress={onItemPress} key={i} />
      ))}
    </Container>
  )
}
