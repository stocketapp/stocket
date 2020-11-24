import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { useUserSelector } from '@selectors'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'

export default function useCreateUserMutation() {
  const { currentUser } = useUserSelector()
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
      if (currentUser?.uid) {
        return mutation({
          variables: { input: MUTATION_INPUT },
        })
      } else {
        throw Error('No current user. Cannot create user data in DB')
      }
    },
    [mutation, currentUser],
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
