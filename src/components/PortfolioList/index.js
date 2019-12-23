import React, { useMemo } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import Text from '../Text'
import PortfolioItem from './PortfolioItem'
import PortfolioEmpty from './PortfolioEmpty'
import { useSelector } from 'react-redux'

export default function PortfolioList() {
  const { portfolioData } = useSelector(({ portfolio }) => portfolio)

  return (
    <View style={styles.container}>
      <Text type="title" style={styles.title}>
        Portfolio
      </Text>

      {!portfolioData || portfolioData.length === 0 ? (
        <PortfolioEmpty />
      ) : (
        <FlatList
          portfolioData={portfolioData}
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
  title: {
    marginBottom: 10,
  },
})
