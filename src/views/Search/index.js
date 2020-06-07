// flow
import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native'
import { Container, SearchSymbols } from 'components'
import { useDebounce, useUser } from 'hooks'
import { searchTerm, addToWatchlist, getBatchStockData } from 'api'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import SearchResult from './SearchResult'

export default function Search(): React$Node {
  const [search, setSearch] = useState(null)
  const [results, setResults] = useState([])
  const debounced = useDebounce(search)
  const { currentUser } = useUser()
  const { navigate } = useNavigation()
  const dispatch = useDispatch()

  useEffect(() => {
    const getResults = async () => {
      try {
        const res = await searchTerm(debounced)
        setResults([res])
      } catch (err) {
        console.log(err)
      }
    }

    if (debounced) {
      getResults(debounced)
    }
  }, [debounced])

  const getResultData = async (symbol: string) => {
    const res = await getBatchStockData(symbol)
    goToStock(res)
  }

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
            item={item}
            onPress={addToWatchlist}
            setStock={getResultData}
            uid={currentUser?.uid}
          />
        )}
        keyExtractor={(i, key) => key.toString()}
        contentContainerStyle={{ paddingVertical: 12 }}
      />
    </Container>
  )
}
