import React, { useCallback, useEffect } from 'react'
import { Container, Text } from '@components'
import type { IEXQuote } from 'types'
import WatchlistItem from './WatchlistItem'
import { useDispatch } from 'react-redux'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { useQuery } from '@apollo/client'
import { WATCHLIST_QUERY } from '@queries'
import { watchlistSymbols, isWatchlistLoading } from '@cache'

export const WatchlistList = () => {
  const dispatch = useDispatch()
  const { navigate } = useNavigation()
  const { data, loading, refetch } = useQuery(WATCHLIST_QUERY)
  const watchlist = data?.watchlist?.quotes
  const symbols = data?.watchlist?.symbols

  const onItemPress = (quote: IEXQuote) => {
    dispatch({
      type: 'SET_SELECTED_STOCK',
      selectedStock: quote?.symbol,
    })
    navigate('Stock')
  }

  useFocusEffect(
    useCallback(() => {
      let refetchInterval = setInterval(async () => await refetch(), 10000)
      watchlistSymbols(symbols)

      return () => clearInterval(refetchInterval)
    }, [symbols, refetch]),
  )

  useEffect(() => {
    isWatchlistLoading(loading)
  }, [loading])

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
