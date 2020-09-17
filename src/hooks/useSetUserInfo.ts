import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import type { CurrentUser } from 'types'

const UsersRef = firestore().collection('Users')

export default function useSetUserInfo(currentUser: CurrentUser) {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { userInfo } = useSelector(({ user }: { user: any }) => user)

  useEffect(() => {
    async function getUserInfo() {
      try {
        setLoading(true)
        const ref = UsersRef.doc(currentUser?.uid)
        await ref.onSnapshot(snapshot => {
          const data = snapshot?.data()
          if (data) {
            dispatch({
              type: 'SET_USER_INFO',
              userInfo: data,
            })
          }
        })
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    if (currentUser) {
      getUserInfo()
    }
  }, [currentUser, dispatch])

  return { loading, userInfo }
}
