import { useEffect } from 'react'
import auth from '@react-native-firebase/auth'
import useStocketMutation from '@mutations'
import { gql } from '@apollo/client'
import useUser from './useUser'
import { useQuery } from '@apollo/client'
import { userVar } from '@cache'
import { useBatchDispatch, useDispatchAction } from '@hooks'

export default function useAuthState() {
  const { isAuth, currentUser } = useUser()
  const StocketMutations = useStocketMutation()
  const { data } = useQuery(USER_QUERY)
  const userData = data?.user
  const batchDispatch = useBatchDispatch()
  const dispatch = useDispatchAction()

  useEffect(() => {
    const authSubscription = auth().onAuthStateChanged(async user => {
      if (user) {
        try {
          batchDispatch([
            { type: 'SET_USER', payload: user },
            { type: 'IS_AUTHENTICATED', payload: true },
          ])
          await StocketMutations.createUser(user)
        } catch (err) {
          console.log('authSubscription', err)
        }
      } else {
        // TODO: LOG OUT with Apollo cache
        dispatch('USER_LOGOUT', false)
      }
    })

    return () => authSubscription()
  }, [])

  useEffect(() => {
    isAuth && userVar(userData)
  }, [userData, isAuth])

  return { isAuth, currentUser }
}

const USER_QUERY = gql`
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
