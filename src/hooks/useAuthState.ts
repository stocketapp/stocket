/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import auth from '@react-native-firebase/auth'
import useStocketMutation from '@mutations'
import { useBatchDispatch, useDispatchAction } from '@hooks'
import useUser from './useUser'

export default function useAuthState() {
  const batchDispatch = useBatchDispatch()
  const dispatch = useDispatchAction()
  const { isAuth, currentUser } = useUser()
  const StocketMutations = useStocketMutation()

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
        dispatch('USER_LOGOUT', false)
      }
    })

    return () => authSubscription()
  }, [])

  return { isAuth, currentUser }
}
