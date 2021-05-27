import { IEX_CLOUD_KEY, IEX_URL } from '../../../../config'
import { useEffect, useState, useCallback } from 'react'
import useDebounce from './useDebounce'
import { SearchResultType } from 'types'

async function iexGet(endpoint: string, query: string = '') {
  const iexUrl = IEX_URL
  const q = query !== '' ? `&${query}` : ''
  const url = `${iexUrl}/${endpoint}?token=${IEX_CLOUD_KEY}${q}`
  const res = await fetch(url, {
    method: 'GET',
  })
  const data = await res.json()
  return data
}

export default function useSearch(term: string): SearchResultType[] | undefined {
  const [results, setResult] = useState<SearchResultType[]>()
  const debounced = useDebounce(term)

  const search = useCallback(async () => {
    try {
      const res = await iexGet(`search/${term}`)
      setResult(res)
    } catch (err) {
      console.trace('[useSearch]', err)
    }
  }, [term])

  useEffect(() => {
    if (debounced) {
      search()
    }
  }, [debounced, term, search])

  return results
}
