// flow
import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native'
import { Container, SearchSymbols } from 'components'
import { BACKGROUND, GRAY_DARKER, GREEN } from 'utils/colors'
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
        setResults(res)
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
    <Container style={styles.container} ph>
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
