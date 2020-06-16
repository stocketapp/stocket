/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { useSelector, useDispatch } from 'react-redux'
import functions from '@react-native-firebase/functions'

const UsersRef = firestore().collection('Users')

export default function useGetMyStocks(): {} {
  const [loading, setLoading] = useState(true)
  const { uid } = useSelector(({ user }) => user.currentUser)
  const dispatch = useDispatch()
  const onUpdateGainsCall = functions().httpsCallable('onUpdateGainsCall')
  const { positions } = useSelector(({ stock }) => stock)

  useEffect(() => {
    onUpdateGainsCall({ uid })
  }, [])

  useEffect(() => {
    const subscribe = UsersRef.doc(uid)
      .collection('positions')
      .onSnapshot(async snapshot => {
        try {
          setLoading(true)
          const list = []
          await snapshot.forEach(doc => {
            list.push(doc.data())
            dispatch({
              type: 'ALL_MY_STOCKS',
              positions: list,
            })
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
