/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import auth from '@react-native-firebase/auth'
import { useDispatch } from 'react-redux'
import useUser from './useUser'
import { useCreateUserMutation } from '@mutations'

export default function useAuthState() {
  const dispatch = useDispatch()
  const { isAuth, currentUser } = useUser()
  const createUserMutation = useCreateUserMutation()

  useEffect(() => {
    const authSubscription = auth().onAuthStateChanged(user => {
      if (user) {
        createUserMutation(user)
        dispatch({
          type: 'SET_USER',
          currentUser: user,
        })
        dispatch({
          type: 'IS_AUTHENTICATED',
          isAuth: true,
        })
      } else {
        dispatch({
          type: 'USER_LOGOUT',
          isAuth: false,
        })
      }
    })

    return () => authSubscription()
  }, [])

  return { isAuth, currentUser }
}
