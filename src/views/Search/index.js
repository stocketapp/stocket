// flow
import React, { useState, useEffect } from 'react'
import { FlatList, View, TouchableOpacity } from 'react-native'
import { Container, SearchSymbols, Text } from 'components'
import { BACKGROUND, GRAY_DARKER, GREEN } from 'utils/colors'
import { useDebounce } from 'hooks'
import { searchTerm } from 'api'
// import { useDispatch } from 'react-redux'

export default function Search(): React$Node {
  const [search, setSearch] = useState(null)
  const [results, setResults] = useState([])
  const debounced = useDebounce(search)

  useEffect(() => {
    const getResults = async () => {
      try {
        const res = await searchTerm(debounced)
        setResults(res)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }

    if (debounced) {
      getResults()
    }
  }, [debounced])

  const renderItem = ({ name, symbol }) => (
    <TouchableOpacity style={styles.resultItem}>
      <View>
        <Text weight="700" type="label">
          {name}
        </Text>
        <Text color={GRAY_DARKER} type="subtext" style={{ paddingTop: 5 }}>
          {symbol}
        </Text>
      </View>

      <TouchableOpacity style={{ padding: 6 }}>
        <View style={styles.plus}>
          <Text
            type="title"
            style={{ bottom: 3.8, left: 0.5 }}
            status="positive"
          >
            +
          </Text>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  )

  return (
    <Container style={styles.container} ph>
      <SearchSymbols value={search} setValue={setSearch} />

      <FlatList
        data={results}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(i, key) => key.toString()}
        contentContainerStyle={{ paddingVertical: 12 }}
      />
    </Container>
  )
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderBottomColor: GRAY_DARKER,
    paddingVertical: 12,
    alignItems: 'center',
  },
  plus: {
    borderWidth: 1.5,
    borderColor: GREEN,
    borderRadius: 100,
    height: 22,
    width: 22,
    alignItems: 'center',
  },
}
