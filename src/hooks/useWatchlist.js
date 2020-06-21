import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { useSelector } from 'react-redux'
import { getBatchStockData } from 'api'
import map from 'lodash.map'

export default function useWatchlist() {
  const { uid } = useSelector(({ user }) => user.currentUser)
  const [watchlist, setWatchlist] = useState([])

  useEffect(() => {
    const subscribe = firestore()
      .collection(`Users/${uid}/watchlist`)
      .onSnapshot(async snapshot => {
        const list = []
        snapshot.forEach(doc => {
          list.push(doc.data().symbol)
        })
        const res = await getBatchStockData(list)
        setWatchlist(map(res, el => el))
      })

    return () => subscribe()
  }, [uid])

  return watchlist
}
