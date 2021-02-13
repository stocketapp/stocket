import React from 'react'
import { Container, Text } from '@components'
import type { IEXQuote } from 'types'
import WatchlistItem from './WatchlistItem'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { WATCHLIST_QUERY } from '../queries'
import { useQuery } from '@apollo/client'

export const WatchlistList = () => {
  const { data, loading } = useQuery(WATCHLIST_QUERY, {
    pollInterval: 10000,
  })
  const watchlist = data?.watchlist.quotes
  const dispatch = useDispatch()
  const { navigate } = useNavigation()

  const onItemPress = (quote: IEXQuote) => {
    dispatch({
      type: 'SET_SELECTED_STOCK',
      selectedStock: quote?.symbol,
    })
    navigate('Stock')
  }

  if (loading) {
    return null
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
