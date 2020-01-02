import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'

const UsersRef = firestore().collection('Users')

export default function useSetUserInfo() {
  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  // const { currentUser } = useSelector(({ user }) => user)

  useEffect(() => {
    let isCancelled = false
    // const uid = currentUser?.uid
    async function getUserInfo() {
      try {
        setLoading(true)
        const info = await UsersRef.doc('tubkakDAXaa1rPLf7IkaWPpKz5y1').get()
        // setUserInfo(info.data())
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

    return () => {
      isCancelled = true
    }
  }, [])

  return { loading, userInfo }
}
