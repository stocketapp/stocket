/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'
import { useDispatch } from 'react-redux'

const marketRef = firestore().doc('Markets/stock_market')

export default function () {
  const dispatch = useDispatch()

  useEffect(() => {
    const subscribe = marketRef.onSnapshot(snapshot => {
      dispatch({
        type: 'SET_MARKET_OPEN',
        isMarketOpen: snapshot.get('is_open'),
      })
    })

    return () => subscribe()
  }, [])
}
