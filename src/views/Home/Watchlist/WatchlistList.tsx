import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from '@components'
import WatchlistItem from './WatchlistItem'
import { IexQuote } from 'types'

type Props = {
  data: Array<IexQuote>
  onItemPress: (item: IexQuote) => void
}

const Watchlist = ({ data, onItemPress }: Props) => (
  <>
    <Text type="title" weight="Heavy" style={styles.title}>
      Watchlist
    </Text>
    {data.map((item: IexQuote, i: number) => (
      <WatchlistItem item={item} key={i} onPress={() => onItemPress(item)} />
    ))}
  </>
)

const styles = StyleSheet.create({
  title: {
    paddingBottom: 10,
  },
})

export default Watchlist
