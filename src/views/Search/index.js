// flow
import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native'
import { Container, SearchSymbols, Text } from 'components'
import { useDebounce, useUser } from 'hooks'
import { searchTerm, addToWatchlist } from 'api'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import SearchResult from './SearchResult'

export default function Search(): React$Node {
  const [search, setSearch] = useState(null)
  const [results, setResults] = useState(null)
  const [savedSearchTerm, setSavedSearchTerm] = useState(null)
  const debounced = useDebounce(search)
  const { currentUser } = useUser()
  const { navigate } = useNavigation()
  const dispatch = useDispatch()

  useEffect(() => {
    const getResults = async () => {
      try {
        setSavedSearchTerm(debounced)
        const res = await searchTerm(debounced)
        setResults([res])
      } catch (err) {
        setResults(null)
        console.log('search', err)
      }
    }

    if (debounced) {
      getResults(debounced)
    }
  }, [debounced])

  const goToStock = (item: {}) => {
    dispatch({
      type: 'SET_SELECTED_STOCK',
      stock: item,
    })
    navigate('Stock')
  }

  return (
    <Container fullView ph safeAreaTop safeAreaBottom>
      <SearchSymbols value={search} setValue={setSearch} />

      <FlatList
        data={results}
        renderItem={({ item }) => (
          <SearchResult
            item={item[savedSearchTerm]}
            onPress={addToWatchlist}
            setStock={() => goToStock(item[savedSearchTerm])}
            uid={currentUser?.uid}
          />
        )}
        keyExtractor={(i, key) => key.toString()}
        contentContainerStyle={{ paddingVertical: 12 }}
        ListEmptyComponent={() => <Text>No results</Text>}
      />
    </Container>
  )
}
