// @flow
import { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'
import { useDispatch } from 'react-redux'

type AuthState = {
  isAuth: boolean,
  currentUser: { uid: string, email: string } | null,
}

export default function useAuthState(): AuthState {
  const dispatch = useDispatch()
  const [isAuth, setIsAuth] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  const onAuthenticated = () => {
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
      if (user) {
        setIsAuth(true)
        setCurrentUser(user)
        onAuthenticated()
      }
    })

    return authSubscription
  })

  return { isAuth, currentUser }
}
