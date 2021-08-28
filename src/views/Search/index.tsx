import { ReactElement } from 'react'

export default function Search(): ReactElement {
  const { useState } = require('react')
  const { Container, SearchSymbols } = require('@components')
  const SearchResult = require('./SearchResult').default
  const useSearch = require('./hooks/useSearch').default

  const [search, setSearch] = useState('')
  const results = useSearch(search)

  return (
    <Container fullView ph safeAreaTop safeAreaBottom>
      <SearchSymbols value={search} setValue={setSearch} />

      <SearchResult data={results} active={search !== ''} />
    </Container>
  )
}
