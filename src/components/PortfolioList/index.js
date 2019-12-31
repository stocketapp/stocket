// @flow
import React, { useMemo } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import Text from '../Text'
import PortfolioItem from './PortfolioItem'
import PortfolioEmpty from './PortfolioEmpty'
import Container from '../Container'

type PortfolioListProps = {
  data: Array<any>,
  loading: boolean,
}

export default function PortfolioList({ data, loading }: PortfolioListProps) {
  return useMemo(
    () => (
      <Container style={styles.container}>
        <Text type="title" style={styles.title}>
          Portfolioo
        </Text>

        {!data || data.length === 0 ? (
          <PortfolioEmpty />
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => <PortfolioItem portfolio={item} />}
            keyExtractor={(index, key) => key.toString()}
          />
        )}
      </Container>
    ),
    [data],
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
