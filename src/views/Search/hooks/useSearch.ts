import { useEffect, useState, useCallback } from 'react'
import { IEX_CLOUD_KEY, IEX_CLOUD_URL } from '../../../../config'
import useDebounce from './useDebounce'
import { SearchResultType } from 'types'

async function iexGet(endpoint: string, query: string = '') {
  const iexUrl = IEX_CLOUD_URL
  const q = query !== '' ? `&${query}` : ''
  const url = `${iexUrl}/${endpoint}?token=${IEX_CLOUD_KEY}${q}`
  const res = await fetch(url, {
    method: 'GET',
  })
  const data = await res.json()
  return data
}

export default function useSearch(term: string): SearchHook {
  const [results, setResult] = useState<SearchResultType[]>([])
  const debounced = useDebounce(term)

  const search = useCallback(async () => {
    try {
      if (term !== '') {
        const res = await iexGet(`search/${term}`)
        setResult(res)
      }
    } catch (err) {
      console.trace('[useSearch]', err)
    }
  }, [term])

  useEffect(() => {
    if (debounced) {
      search()
    }
  }, [debounced, term, search])

  useEffect(() => {
    if (term === '') {
      setResult([])
    }
  }, [term])

  return { results, onSearch: search }
}

interface SearchHook {
  results: SearchResultType[]
  onSearch: () => Promise<void>
}
