import { useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'
import { useSelector, useDispatch } from 'react-redux'
import { getBatchStockData } from 'api'
import map from 'lodash.map'

export default function useWatchlist() {
  const { uid } = useSelector(({ user }) => user.currentUser)
  const { watchlist } = useSelector(({ stock }) => stock)
  const dispatch = useDispatch()

  useEffect(() => {
    const subscribe = firestore()
      .collection(`Users/${uid}/watchlist`)
      .onSnapshot(async snapshot => {
        const list = []
        snapshot.forEach(doc => {
          list.push(doc.data().symbol)
        })
        const res = await getBatchStockData(list)
        dispatch({
          type: 'SET_WATCHLIST',
          watchlist: map(res, el => el),
        })
      })

    return () => subscribe()
  }, [uid, dispatch])

  return watchlist
}
