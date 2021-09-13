import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { UserType } from 'types'

export default function useCreateUserMutation() {
  const [mutation] = useMutation<{ createUser: CreateUserType }>(GET_USER_QUERY)
  const createUser = useCallback(
    async (user: FirebaseAuthTypes.User | null) => {
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

interface CreateUserType {
  success: boolean
  message: string
  user: UserType
}

const GET_USER_QUERY = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      success
      message
      user {
        displayName
        uid
        id
        email
        cash
      }
    }
  }
`
