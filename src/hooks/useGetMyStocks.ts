// @flow
import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { useSelector, useDispatch } from 'react-redux'
import type { PortfolioState } from 'types'

const UsersRef = firestore().collection('Users')

export default function useGetMyStocks(uid: string): PortfolioState {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const { positions } = useSelector(({ stock }: { stock: any }) => stock)

  useEffect(() => {
    const subscribe = UsersRef.doc(uid)
      .collection('positions')
      .orderBy('todayGainsPct', 'desc')
      .onSnapshot(async snapshot => {
        setLoading(true)
        const list = snapshot.docs.map(el => el.data())
        dispatch({
          type: 'ALL_MY_STOCKS',
          positions: list,
        })
        setLoading(false)
      })

    return () => subscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { positions, loading }
}
