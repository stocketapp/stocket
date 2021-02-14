import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'

export default function useCreateUserMutation() {
  const [mutation] = useMutation(GET_USER_QUERY)
  const createUser = useCallback(
    async (user: FirebaseAuthTypes.User) => {
      const { displayName, email, uid } = user ?? {}
      const MUTATION_INPUT = {
        user: {
          uid,
          email,
          displayName,
        },
      }
      if (uid) {
        return mutation({
          variables: { input: MUTATION_INPUT },
        })
      }
    },
    [mutation],
  )

  return createUser
}

const GET_USER_QUERY = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      success
      message
    }
  }
`
