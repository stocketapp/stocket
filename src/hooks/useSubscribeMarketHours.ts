import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import type { DocumentSnapshot } from 'types'

const marketRef = firestore().doc('Markets/stock_market')

export default function useSubscribeMarketHours() {
  const [status, setStatus] = useState(false)

  useEffect(() => {
    const subscribe = marketRef.onSnapshot((snapshot: DocumentSnapshot, err?: any) => {
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
