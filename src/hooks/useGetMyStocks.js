// @flow
import { useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'
import functions from '@react-native-firebase/functions'
import { useSelector, useDispatch } from 'react-redux'
import { getBatchStockData } from 'api'

const UsersRef = firestore().collection('Users')

export default function useGetPortfolio(): {} {
  const { uid } = useSelector(({ user }) => user.currentUser)
  const { positions, loading } = useSelector(({ stock }) => stock)
  const dispatch = useDispatch()

  useEffect(() => {
    const setLoading = (payload: boolean) => {
      dispatch({ type: 'SET_PORTFOLIO_LOADING', payload })
    }

    return UsersRef.doc(uid)
      .collection('positions')
      .onSnapshot(async snapshot => {
        const list = []
        snapshot.forEach(doc => list.push(doc.data()))
        if (list.length > 0) {
          dispatch({ type: 'ALL_MY_STOCKS', positions: list })
          const syms = list.map(el => el.symbol)
          const positionsMktData = await getBatchStockData(syms.join(','))
          if (positionsMktData) {
            dispatch({ type: 'MY_STOCKS_MKT_DATA', positionsMktData })
          }
        }

        if (loading) {
          setLoading(false)
        }
      })
  }, [dispatch, loading, uid])

  return { positions, loading: true }
}
