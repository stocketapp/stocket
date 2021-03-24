import { useState, useEffect, useCallback, ReactElement } from 'react'
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
import { watchlistSymbolsVar, watchlistQuotesVar } from '@cache'
import { remove } from 'lodash'

export default function Search(): ReactElement {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const debounced = useDebounce(search)
  const { navigate } = useNavigation()
  const dispatch = useDispatch()
  const addToWatchlistMutate = useStocketMutation(ADD_TO_WATCHLIST)
  const removeFromWatchlistMutate = useStocketMutation(REMOVE_FROM_WATCHLIST)
  const watchlistSymbols = useReactiveVar(watchlistSymbolsVar)
  const watchlistQuotes = useReactiveVar(watchlistQuotesVar)

  useEffect(() => {
    const getResults = async () => {
      try {
        const res = await searchTerm(debounced)
        setResults(res)
      } catch (err) {
        setResults([])
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
    navigate('Stock', { symbol })
  }

  const isFaved = useCallback((symbol: string): boolean => includes(watchlistSymbols, symbol), [
    watchlistSymbols,
  ])

  const addToWatchlistSymbolsCache = (newValue: string) => {
    watchlistSymbolsVar([...(watchlistSymbols ?? []), newValue])
  }

  const removeFromWatchlistCache = (symbol: string) => {
    watchlistSymbolsVar(remove(watchlistSymbols, el => el !== symbol))
    watchlistQuotesVar(remove(watchlistQuotes, el => el.symbol !== symbol))
  }

  const toggleFromWatchlist = async (symbol: string) => {
    if (!isFaved(symbol)) {
      const { data } = await addToWatchlistMutate({ symbol }, () =>
        addToWatchlistSymbolsCache(symbol),
      )
      watchlistQuotesVar([...(watchlistQuotesVar() ?? []), data?.addToWatchlist])
    } else {
      await removeFromWatchlistMutate({ symbol }, () => removeFromWatchlistCache(symbol))
    }
  }

  return (
    <Container fullView ph safeAreaTop safeAreaBottom>
      <SearchSymbols value={search} setValue={setSearch} />

      {results?.map(
        (item: SearchResultType, i: number) =>
          item && (
            <SearchResult
              item={item}
              onPress={toggleFromWatchlist}
              setStock={() => goToStock(item?.symbol)}
              isFaved={isFaved(item?.symbol)}
              key={i}
            />
          ),
      )}
    </Container>
  )
}
