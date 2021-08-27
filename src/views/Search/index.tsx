import type { SearchResultType } from 'types'
import type { ReactElement } from 'react'

export default function Search(): ReactElement {
  const { useState } = require('react')
  const { Container, SearchSymbols } = require('@components')
  const { useNavigation } = require('@react-navigation/native')
  const SearchResult = require('./SearchResult').default
  const useSearch = require('./hooks/useSearch').default

  const [search, setSearch] = useState('')
  const { navigate } = useNavigation()
  const results = useSearch(search)

  return (
    <Container fullView ph safeAreaTop safeAreaBottom scrollable>
      <SearchSymbols value={search} setValue={setSearch} />

      {search === '' ||
        results?.map((item: SearchResultType, i: number) => (
          <SearchResult
            item={item}
            setStock={() => navigate('Stock', { symbol: item?.symbol })}
            key={i}
          />
        ))}
    </Container>
  )
}
