import { useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'
import { useSelector, useDispatch } from 'react-redux'
import { getBatchStockData } from 'api'
import uniqBy from 'lodash.uniqby'

export default function useWatchlist() {
  const { uid } = useSelector(({ user }) => user.currentUser)
  const { watchlist } = useSelector(({ stock }) => stock)
  const dispatch = useDispatch()

  useEffect(() => {
    const subscribe = firestore()
      .collection(`Users/${uid}/watchlist`)
      .onSnapshot(async snapshot => {
        snapshot.docChanges().forEach(async ({ doc, type }) => {
          if (type === 'removed') {
            dispatch({
              type: 'REMOVE_FROM_WATCHLIST',
              symbol: doc.data().symbol,
            })
          } else if (type === 'added') {
            const symbol = doc.data().symbol
            const res = await getBatchStockData(doc.data().symbol)
            dispatch({
              type: 'SET_WATCHLIST',
              watchlist: res[symbol],
            })
          }
        })
      })

    return () => subscribe()
  }, [uid, dispatch])

  return uniqBy(watchlist, 'symbol')
}
