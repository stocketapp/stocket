import { useEffect, useState } from 'react'
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore'
import type { DocReference } from 'types'

const marketRef = firestore().doc('Markets/stock_market')

type Snapshot = FirebaseFirestoreTypes.DocumentReference<
  FirebaseFirestoreTypes.DocumentData
>
export default function useSubscribeMarketHours() {
  const [status, setStatus] = useState(false)

  useEffect(() => {
    const subscribe = marketRef.onSnapshot((snapshot: any, err: any) => {
      if (err) {
        console.log('Error fetching market status', err)
      } else {
        const isOpen: boolean = snapshot.get('is_open')
        setStatus(isOpen)
      }
    })

    return () => subscribe()
  }, [])

  return status
}
