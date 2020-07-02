// @flow
import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { useSelector, useDispatch } from 'react-redux'
import { callUpdateGains } from 'api'

const UsersRef = firestore().collection('Users')

export default function useGetMyStocks(uid: string): {} {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const { positions } = useSelector(({ stock }) => stock)

  useEffect(() => {
    callUpdateGains(uid)
  }, [uid])

  useEffect(() => {
    const subscribe = UsersRef.doc(uid)
      .collection('positions')
      .orderBy('gainsPercentage', 'desc')
      .onSnapshot(async snapshot => {
        try {
          setLoading(true)
          const list = []
          await snapshot.forEach(doc => {
            list.push(doc.data())
          })
          dispatch({
            type: 'ALL_MY_STOCKS',
            positions: list,
          })
        } catch (err) {
          console.log('useGetMyStocks', err)
        } finally {
          setLoading(false)
        }
      })

    return () => subscribe()
  }, [])

  return { positions, loading }
}
