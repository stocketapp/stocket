import { useEffect } from 'react'
import auth from '@react-native-firebase/auth'
import useStocketMutation from '@mutations'
import { gql } from '@apollo/client'
import { useReactiveVar } from '@apollo/client'
import { userVar, isAuthenticatedVar } from '@cache'
import { UserType } from 'types'
import Gleap from 'react-native-gleapsdk'

export default function useAuthState(): AuthState {
  const StocketMutations = useStocketMutation()
  const isAuthed = useReactiveVar(isAuthenticatedVar)
  const user = useReactiveVar(userVar)

  useEffect(() => {
    const authSubscription = auth().onAuthStateChanged(async currentUser => {
      if (currentUser) {
        try {
          Gleap.identify(currentUser?.uid, {
            email: currentUser?.email as string,
            name: currentUser?.displayName?.replace('null', '') as string,
          })
          const res = await StocketMutations.createUser(currentUser)
          userVar(res?.data?.createUser?.user)
          isAuthenticatedVar(true)
        } catch (err) {
          console.log('authSubscription', err)
        }
      } else {
        isAuthenticatedVar(false)
        userVar(null)
        Gleap.clearIdentity()
      }
    })

    return () => authSubscription()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return { isAuthed, user }
}

interface AuthState {
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
