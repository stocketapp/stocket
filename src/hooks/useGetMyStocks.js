// @flow
import { useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'
import { useSelector, useDispatch } from 'react-redux'
import { getBatchStockData } from 'api'

const UsersRef = firestore().collection('Users')

export default function useGetPortfolio(): {} {
  const { uid } = useSelector(({ user }) => user.currentUser)
  const { positions, loading, positionsMktData: mktData } = useSelector(({ stock }) => stock)
  const dispatch = useDispatch()

  // THIS IS CALLED AGAIN WHEN MAKING A PURCHASE/SELLING STOCK
  // CAUSING THE GRAPH TO FREEZE AND STOPPING THE STOCKVIEW FROM RE-RENDERING
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
          if (!mktData) {
            const positionsMktData = await getBatchStockData(syms.join(','))
            if (positionsMktData) {
              dispatch({ type: 'MY_STOCKS_MKT_DATA', positionsMktData })
            }
          }
        }

        if (loading) {
          setLoading(false)
        }
      })
  }, [])

  return { positions, loading: true }
}
