// @flow
import { useEffect } from 'react'
import auth from '@react-native-firebase/auth'
import { useDispatch, useSelector } from 'react-redux'

export default function useAuthState() {
  const dispatch = useDispatch()
  const { isAuth, currentUser } = useSelector(({ user }) => user)

  useEffect(() => {
    const authSubscription = auth().onAuthStateChanged(user => {
      if (user) {
        dispatch({
          type: 'SET_USER',
          currentUser: user,
        })
        dispatch({
          type: 'IS_AUTHENTICATED',
          isAuth: true,
        })
      }
    })

    return () => authSubscription()
  }, [])

  return { isAuth, currentUser }
}
