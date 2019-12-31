// @flow
import React, { useMemo } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Loader } from 'stocket-components'
import Text from '../Text'
import PortfolioItem from './PortfolioItem'
import PortfolioEmpty from './PortfolioEmpty'
import Container from '../Container'

type PortfolioListProps = {
  data: Array<any>,
  loading: boolean,
}

export default function PortfolioList({ data, loading }: PortfolioListProps) {
  const renderItem = ({ item }) => <PortfolioItem item={item} />

  return useMemo(
    () => (
      <Container style={styles.container} ph>
        <Text type="title" style={styles.title}>
          Portfolio
        </Text>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(index, key) => key.toString()}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <View style={styles.listLoader}>
              <Loader />
            </View>
          )}
        />
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
  list: {
    minHeight: 200,
  },
  listContent: {
    paddingTop: 10,
  },
  listLoader: {
    width: '100%',
    alignItems: 'center',
  },
})
