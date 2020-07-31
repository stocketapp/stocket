// @flow
import { useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'
import { useSelector, useDispatch } from 'react-redux'
import { getBatchStockData } from 'api'
import { uniqBy, map } from 'lodash'

export default function useWatchlist(uid: string) {
  const { watchlist } = useSelector(({ stock }) => stock)
  const dispatch = useDispatch()

  useEffect(() => {
    const subscribe = firestore()
      .collection(`Users/${uid}/watchlist`)
      .onSnapshot(async snapshot => {
        const symbols = snapshot.docs.map(doc => doc?.data()?.symbol)
        const res = await getBatchStockData(symbols?.join(','))

        dispatch({
          type: 'SET_WATCHLIST',
          watchlist: map(res, el => el),
        })
      })

    return () => subscribe()
  }, [uid, dispatch])

  return uniqBy(watchlist, el => el?.quote?.symbol)
}
