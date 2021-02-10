import { useMutation } from '@apollo/client'
import type { DocumentNode, TypedDocumentNode, MutationHookOptions } from '@apollo/client'
import { useCallback } from 'react'

type mutationType = DocumentNode | TypedDocumentNode<any, Record<string, any>>
type mutationOptions = MutationHookOptions<any, Record<string, any>> | undefined
type variablesType = Record<string, any> | undefined

export default function useStocketMutation(mutation: mutationType, options?: mutationOptions) {
  const [mutate] = useMutation(mutation, options)

  const callback = useCallback((input: variablesType) => mutate({ variables: { input } }), [mutate])

  return callback
}
