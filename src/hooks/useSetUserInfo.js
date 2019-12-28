import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { useDispatch } from 'react-redux'

const UsersRef = firestore().collection('Users')

export default function useSetUserInfo(currentUser: CurrentUser) {
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
  }, [currentUser, dispatch])

  return { loading, userInfo }
}

type CurrentUser = {
  currentUser: {
    uid: string,
    email: string,
  } | null,
}
