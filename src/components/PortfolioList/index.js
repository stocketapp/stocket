import React, { useMemo } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import Text from '../Text'
import PortfolioItem from './PortfolioItem'
import PortfolioEmpty from './PortfolioEmpty'
import Container from '../Container'

export default function PortfolioList() {
  const { portfolioData } = useSelector(({ portfolio }) => portfolio)

  return (
    <Container style={styles.container}>
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
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  title: {
    marginBottom: 10,
  },
})
