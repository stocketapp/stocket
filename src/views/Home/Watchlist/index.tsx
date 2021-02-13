import React from 'react'
import { Container, Text } from '@components'
import type { IEXQuote } from 'types'
import WatchlistItem from './WatchlistItem'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useReactiveVar } from '@apollo/client'
import { watchlistQuotes } from '../../../Cache'

export const WatchlistList = () => {
  const dispatch = useDispatch()
  const { navigate } = useNavigation()
  const watchlist = useReactiveVar(watchlistQuotes)

  const onItemPress = (quote: IEXQuote) => {
    dispatch({
      type: 'SET_SELECTED_STOCK',
      selectedStock: quote?.symbol,
    })
    navigate('Stock')
  }

  return (
    <Container>
      <Text type="title" weight="Heavy" style={{ paddingBottom: 10 }}>
        Watchlist
      </Text>
      {watchlist?.map((el: IEXQuote, i: number) => (
        <WatchlistItem item={el} onPress={onItemPress} key={i} />
      ))}
    </Container>
  )
}
