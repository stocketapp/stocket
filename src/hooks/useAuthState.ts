import { useEffect } from 'react'
import auth from '@react-native-firebase/auth'
import useStocketMutation from '@mutations'
import { gql } from '@apollo/client'
import { useReactiveVar } from '@apollo/client'
import { userVar, isAuthenticatedVar } from '@cache'
import { UserType } from 'types'

export default function useAuthState(): AuthState {
  const StocketMutations = useStocketMutation()
  const isAuthed = useReactiveVar(isAuthenticatedVar)
  const user = useReactiveVar(userVar)

  useEffect(() => {
    const authSubscription = auth().onAuthStateChanged(async currentUser => {
      if (currentUser) {
        try {
          const res = await StocketMutations.createUser(currentUser)
          userVar(res?.data?.createUser?.user)
          isAuthenticatedVar(true)
        } catch (err) {
          console.log('authSubscription', err)
        }
      } else {
        isAuthenticatedVar(false)
        userVar(null)
      }
    })

    return () => authSubscription()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return { isAuthed, user }
}

export interface AuthState {
  isAuthed: boolean
  user: UserType | null
}

export const USER_QUERY = gql`
  query {
    user {
      displayName
      uid
      id
      email
      cash
    }
  }
`
