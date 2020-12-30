import React from 'react'
import { StyleSheet, View } from 'react-native'
import { IexQuote } from 'types'
import StocketQueries from '@queries'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import WatchlistList from './WatchlistList'
import { Loader } from '@components'

const Watchlist = () => {
  const { data, loading, error } = StocketQueries.useGetWatchlist()
  const dispatch = useDispatch()
  const { navigate } = useNavigation()

  const onItemPress = (stockInfo: IexQuote) => {
    dispatch({
      type: 'SET_SELECTED_STOCK',
      selectedStock: stockInfo?.symbol,
    })
    navigate('Stock')
  }

  if (error) {
    return null
  }

  return (
    <View style={styles.container}>
      {loading ? <Loader /> : <WatchlistList data={data} onItemPress={onItemPress} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingTop: 25,
  },
  title: {
    paddingBottom: 10,
  },
})

export default Watchlist
