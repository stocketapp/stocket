import { useCallback } from 'react'
import { DocumentNode, useQuery, QueryHookOptions, TypedDocumentNode } from '@apollo/client'
import { useFocusEffect } from '@react-navigation/native'

type Query = DocumentNode | TypedDocumentNode<any, Record<string, any>>
type Options = QueryHookOptions<any, Record<string, any>> | undefined

function useRefetchQuery(query: Query, pollInterval: number = 5000, options?: Options) {
  const result = useQuery(query, { ...options })

  const refetch = useCallback(() => {
    const refetchInterval = setInterval(() => {
      result.refetch()
    }, pollInterval)

    return () => clearTimeout(refetchInterval)
  }, [result, pollInterval])

  useFocusEffect(refetch)

  return result ?? []
}

export default useRefetchQuery
