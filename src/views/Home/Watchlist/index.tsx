import React from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { Container, Text } from '@components'
import StocketQueries from '@queries'
import { Touchable, Column } from './styles'

const WatchlistItem = () => (
  <Touchable>
    <Column />
    <Column />
  </Touchable>
)

export const WatchlistList = () => {
  const { data } = StocketQueries.useGetWatchlist()

  return (
    <Container>
      <FlatList data={data} renderItem={() => <WatchlistItem />} />
    </Container>
  )
}
