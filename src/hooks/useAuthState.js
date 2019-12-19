// @flow
import { useEffect } from 'react'
import auth from '@react-native-firebase/auth'
import { useDispatch } from 'react-redux'

export default function useAuthState() {
  const dispatch = useDispatch()

  const onAuthenticated = (isAuth: boolean, currentUser: {}) => {
    dispatch({
      type: 'IS_AUTHENTICATED',
      isAuth,
    })
    dispatch({
      type: 'SET_USER',
      currentUser,
    })
  }

  useEffect(() => {
    const authSubscription = auth().onAuthStateChanged(user => {
      if (!user) {
        onAuthenticated(false, null)
      } else {
        onAuthenticated(true, user)
      }
    })

    return authSubscription
  })
}
