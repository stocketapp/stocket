import { searchTerm } from '@api'
import type { SearchResultType } from 'types'
import type { ReactElement } from 'react'

export default function Search(): ReactElement {
  const { useState, useEffect } = require('react')
  const { Container, SearchSymbols } = require('@components')
  const { useDebounce } = require('@hooks')
  const { useNavigation } = require('@react-navigation/native')

  const SearchResult = require('./SearchResult').default

  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const debounced = useDebounce(search)
  const { navigate } = useNavigation()

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

  return (
    <Container fullView ph safeAreaTop safeAreaBottom>
      <SearchSymbols value={search} setValue={setSearch} />

      {results?.map((item: SearchResultType, i: number) => (
        <SearchResult
          item={item}
          setStock={() => navigate('Stock', { symbol: item?.symbol })}
          key={i}
        />
      ))}
    </Container>
  )
}
