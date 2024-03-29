import { MutationUpdaterFn, useMutation } from '@apollo/client'
import type { DocumentNode, TypedDocumentNode, MutationHookOptions } from '@apollo/client'
import { useCallback } from 'react'

type mutationType = DocumentNode | TypedDocumentNode<any, Record<string, any>>
type mutationOptions = MutationHookOptions<any, Record<string, any>> | undefined
type variablesType = Record<string, any> | undefined

export default function useStocketMutation<StocketDataType>(
  mutation: mutationType,
  options?: mutationOptions,
) {
  const [mutate] = useMutation<StocketDataType>(mutation, options)

  const callback = useCallback(
    (input: variablesType, update?: MutationUpdaterFn) =>
      mutate({ variables: { input }, update }),
    [mutate],
  )

  return callback
}
