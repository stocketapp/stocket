import { searchTerm } from '@api'
import type { SearchResultType } from 'types'
import type { ReactElement } from 'react'

export default function Search(): ReactElement {
  const { useState, useEffect } = require('react')
  const { Container, SearchSymbols } = require('@components')
  const { useDebounce } = require('@hooks')
  const { useNavigation } = require('@react-navigation/native')
  const { useDispatch } = require('react-redux')

  const SearchResult = require('./SearchResult').default

  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const debounced = useDebounce(search)
  const { navigate } = useNavigation()
  const dispatch = useDispatch()

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

  return (
    <Container fullView ph safeAreaTop safeAreaBottom>
      <SearchSymbols value={search} setValue={setSearch} />

      {results?.map((item: SearchResultType, i: number) => (
        <SearchResult item={item} setStock={() => goToStock(item?.symbol)} key={i} />
      ))}
    </Container>
  )
}
