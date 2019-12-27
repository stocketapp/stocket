import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { useDispatch } from 'react-redux'
import useAuthState from './useAuthState'

const UsersRef = firestore().collection('Users')

export default function useSetUserInfo() {
  const { currentUser } = useAuthState()
  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const uid = currentUser?.uid
    async function getUserInfo() {
      try {
        setLoading(true)
        const info = await UsersRef.doc(uid).get()
        setUserInfo(info.data())
        dispatch({
          type: 'SET_USER_INFO',
          userInfo: info.data(),
        })
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    getUserInfo()
  }, [currentUser])

  return { loading, userInfo }
}
