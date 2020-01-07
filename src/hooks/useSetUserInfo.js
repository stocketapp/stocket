import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'

const UsersRef = firestore().collection('Users')

export default function useSetUserInfo() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { userInfo, currentUser } = useSelector(({ user }) => user)

  useEffect(() => {
    async function getUserInfo() {
      try {
        setLoading(true)
        const info = await UsersRef.doc(currentUser?.uid).get()
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
