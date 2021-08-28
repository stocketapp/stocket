import { ReactElement } from 'react'
import useList from './hooks/useList'
import { HorizontalList } from '@components'

export default function Search(): ReactElement {
  const { useState } = require('react')
  const { Container, SearchSymbols } = require('@components')
  const SearchResult = require('./SearchResult').default
  const useSearch = require('./hooks/useSearch').default

  const [search, setSearch] = useState('')
  const results = useSearch(search)
  const { gainers, losers } = useList()

  return (
    <Container fullView ph safeAreaTop safeAreaBottom>
      <SearchSymbols value={search} setValue={setSearch} />

      <SearchResult data={results} active={search !== ''} />

      <HorizontalList title="Gainers" data={gainers.data?.list} />
      <HorizontalList title="Losers" data={losers.data?.list} />
    </Container>
  )
}
