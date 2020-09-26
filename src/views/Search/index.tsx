// flow
import React, { useState, useEffect, useCallback, ReactElement } from 'react'
import { FlatList } from 'react-native'
import { Container, SearchSymbols } from '@components'
import { useDebounce, useUser } from '@hooks'
import { searchTerm, addToWatchlist, removeFromWatchlist } from '@api'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { includes, map } from 'lodash'
import type { SearchResultType } from 'types'
import SearchResult from './SearchResult'

export default function Search(): ReactElement {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState(null)
  const debounced = useDebounce(search)
  const { currentUser } = useUser()
  const { navigate } = useNavigation()
  const dispatch = useDispatch()
  const { watchlist } = useSelector(({ stock }) => stock)

  useEffect(() => {
    const getResults = async () => {
      try {
        const res = await searchTerm(debounced)
        setResults(res)
      } catch (err) {
        setResults(null)
        console.log('search', err)
      }
    }

    if (debounced) {
      getResults()
    }
  }, [debounced])

  const goToStock = (symbol: string) => {
    dispatch({
      type: 'SET_SELECTED_STOCK',
      selectedStock: symbol,
    })
    navigate('Stock')
  }

  const isFaved = useCallback(
    (symbol: string): boolean => {
      const arr = map(watchlist, el => el?.quote?.symbol)
      return includes(arr, symbol)
    },
    [watchlist],
  )

  const toggleFromWatchlist = (uid: string, symbol: string, isFav: boolean) => {
    if (!isFav) {
      addToWatchlist(uid, symbol)
    } else {
      removeFromWatchlist(uid, symbol)
    }
  }

  return (
    <Container fullView ph safeAreaTop safeAreaBottom>
      <SearchSymbols value={search} setValue={setSearch} />

      <FlatList
        data={results ?? []}
        renderItem={({ item }: { item: SearchResultType }) => (
          <SearchResult
            item={item}
            onPress={toggleFromWatchlist}
            setStock={() => goToStock(item?.symbol)}
            uid={currentUser?.uid}
            isFaved={isFaved}
          />
        )}
        keyExtractor={(i, key) => key.toString()}
        contentContainerStyle={{ paddingVertical: 12 }}
      />
    </Container>
  )
}
