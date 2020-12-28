import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '@components'
import WatchlistItem from './WatchlistItem'
import type { SelectedStockData } from 'types'

type Props = {
  data: Array<SelectedStockData>
  onItemPress: (item: SelectedStockData) => void
}

const Watchlist = ({ data, onItemPress }: Props) => (
  <View style={styles.container}>
    <Text type="title" weight="Heavy" style={styles.title}>
      Watchlist
    </Text>
    {data.map((item, i) => (
      <WatchlistItem item={item} key={i} onPress={() => onItemPress(item)} />
    ))}
  </View>
)

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
