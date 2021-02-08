import React from 'react'
import { Container } from '@components'
import type { IEXQuote } from 'types'
import WatchlistItem from './WatchlistItem'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { GET_WATCHLIST_QUERY } from '@queries'
import { useQuery } from '@apollo/client'

export const WatchlistList = () => {
  const { data } = useQuery(GET_WATCHLIST_QUERY)
  const watchlist = data?.getWatchlist
  const dispatch = useDispatch()
  const { navigate } = useNavigation()

  const onItemPress = (quote: IEXQuote) => {
    dispatch({
      type: 'SET_SELECTED_STOCK',
      selectedStock: quote?.symbol,
    })
    navigate('Stock')
  }

  return (
    <Container>
      {watchlist?.map((el: IEXQuote, i: number) => (
        <WatchlistItem item={el} onPress={onItemPress} key={i} />
      ))}
    </Container>
  )
}
