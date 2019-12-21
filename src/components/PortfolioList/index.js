import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import Text from '../Text'
import PortfolioItem from './PortfolioItem'
import PortfolioEmpty from './PortfolioEmpty'

export default function PortfolioList() {
  const data = [1]
  return (
    <View style={styles.container}>
      <Text type="title">Portfolio</Text>

      {!data ? (
        <PortfolioEmpty />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => <PortfolioItem portfolio={item} />}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
})
