// @flow
import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { useSelector, useDispatch } from 'react-redux'
import { getBatchStockData } from 'api'

const UsersRef = firestore().collection('Users')

export default function useGetPortfolio(): {} {
  const [loading, setLoading] = useState(true)
  const { uid } = useSelector(({ user }) => user.currentUser)
  const dispatch = useDispatch()
  const { positions, positionsMktData: mktData } = useSelector(
    ({ stock }) => stock,
  )

  // THIS IS CALLED AGAIN WHEN MAKING A PURCHASE/SELLING STOCK
  // CAUSING THE GRAPH TO FREEZE AND STOPPING THE STOCKVIEW FROM RE-RENDERING
  useEffect(() => {
    return UsersRef.doc(uid)
      .collection('positions')
      .onSnapshot(async snapshot => {
        try {
          setLoading(true)
          const list = []
          snapshot.forEach(doc => list.push(doc.data()))
          if (list.length > 0) {
            dispatch({ type: 'ALL_MY_STOCKS', positions: list })
            const syms = list.map(el => el.symbol)
            // TODO: CALL THIS WHENEVER THE POSITION CHANGES IN DB
            if (!mktData) {
              const positionsMktData = await getBatchStockData(syms.join(','))
              if (positionsMktData) {
                dispatch({ type: 'MY_STOCKS_MKT_DATA', positionsMktData })
              }
            }
          }
        } catch (err) {
          console.log('useGetPortfolio', err)
        } finally {
          setLoading(false)
        }
      })
  }, [mktData, uid, dispatch])

  return { positions, loading }
}
