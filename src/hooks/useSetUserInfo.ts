/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { useUserSelector } from '@selectors'
import { useDispatchAction } from '@hooks'

const UsersRef = firestore().collection('Users')

export default function useSetUserInfo() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatchAction()
  const { userInfo, currentUser } = useUserSelector()

  useEffect(() => {
    const ref = UsersRef.doc(currentUser?.uid)
    const unsubscribe = ref.onSnapshot(snapshot => {
      setLoading(true)
      const data = snapshot?.data()
      if (data) {
        dispatch('SET_USER_INFO', data)
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [currentUser])

  return { loading, userInfo }
}
