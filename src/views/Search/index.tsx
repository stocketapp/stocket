import React, { useState, useEffect, useCallback, ReactElement } from 'react'
import { FlatList } from 'react-native'
import { Container, SearchSymbols } from '@components'
import { useDebounce, useStocketMutation } from '@hooks'
import { searchTerm } from '@api'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { includes } from 'lodash'
import type { SearchResultType } from 'types'
import SearchResult from './SearchResult'
import { ADD_TO_WATCHLIST, REMOVE_FROM_WATCHLIST } from '@mutations'
import { useReactiveVar } from '@apollo/client'
import { watchlistSymbolsVar } from '@cache'
import { remove } from 'lodash'

export default function Search(): ReactElement {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState(null)
  const debounced = useDebounce(search)
  const { navigate } = useNavigation()
  const dispatch = useDispatch()
  const addToWatchlistMutate = useStocketMutation(ADD_TO_WATCHLIST)
  const removeFromWatchlistMutate = useStocketMutation(REMOVE_FROM_WATCHLIST)
  const watchlistSymbols = useReactiveVar(watchlistSymbolsVar)

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

  const isFaved = useCallback((symbol: string): boolean => includes(watchlistSymbols, symbol), [
    watchlistSymbols,
  ])

  const addToWatchlistCache = (newValue: string) => {
    watchlistSymbolsVar([...(watchlistSymbols ?? []), newValue])
  }

  const removeFromWatchlistCache = (symbol: string) => {
    watchlistSymbolsVar(remove(watchlistSymbols, el => el !== symbol))
  }

  const toggleFromWatchlist = (symbol: string, isFav: boolean) => {
    if (!isFav) {
      addToWatchlistMutate({ symbol }, addToWatchlistCache(symbol))
    } else {
      removeFromWatchlistMutate({ symbol }, removeFromWatchlistCache(symbol))
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
            isFaved={isFaved}
          />
        )}
        keyExtractor={(i, key) => key.toString()}
        contentContainerStyle={{ paddingVertical: 12 }}
      />
    </Container>
  )
}
