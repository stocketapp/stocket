import { ReactElement, useState } from 'react'
import { ScrollView } from 'react-native'
import { HorizontalList, Container, SearchSymbols } from '@components'
import useList from './hooks/useList'
import useSearch from './hooks/useSearch'
import theme from '@theme'

export default function Search(): ReactElement {
  const [search, setSearch] = useState('')
  const { results, onSearch } = useSearch(search)
  const { gainers, losers } = useList()

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      style={{ backgroundColor: theme.colors.BG_DARK }}
    >
      <Container fullView ph safeAreaTop safeAreaBottom>
        <SearchSymbols
          value={search}
          setValue={setSearch}
          data={results}
          onSearch={onSearch}
        />

        <HorizontalList
          title="Gainers"
          data={gainers.data?.list}
          loading={gainers.loading}
        />
        <HorizontalList
          title="Losers"
          data={losers.data?.list}
          loading={losers.loading}
        />
      </Container>
    </ScrollView>
  )
}
