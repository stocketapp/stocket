// @flow
import React, { useMemo } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import Text from '../Text'
import PortfolioItem from './PortfolioItem'
import PortfolioEmpty from './PortfolioEmpty'
import Container from '../Container'
import Loader from '../Loader'

type PortfolioListProps = {
  data: Array<any>,
  loading: boolean,
}

export default function PortfolioList({ data, loading }: PortfolioListProps) {
  const renderItem = ({ item }) => <PortfolioItem item={item} />

  return useMemo(
    () => (
      <Container style={styles.container} ph>
        <Container horizontal separate>
          <Text type="title" style={styles.title}>
            Portfolio
          </Text>
        </Container>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(index, key) => key.toString()}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <View style={styles.listLoader}>
              {loading ? <Loader /> : <PortfolioEmpty />}
            </View>
          )}
        />
      </Container>
    ),
    [data, loading],
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
