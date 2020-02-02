import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'

const UsersRef = firestore().collection('Users')

export default function useSetUserInfo(currentUser) {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { userInfo } = useSelector(({ user }) => user)

  useEffect(() => {
    async function getUserInfo() {
      try {
        setLoading(true)
        const info = await UsersRef.doc(currentUser?.uid).get()
        const data = info.data()
        if (data) {
          dispatch({
            type: 'SET_USER_INFO',
            userInfo: data,
          })
        }
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