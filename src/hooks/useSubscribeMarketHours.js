import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'

const marketRef = firestore().doc('Markets/stock_market')

export default function useSubscribeMarketHours() {
  const [status, setStatus] = useState(false)

  useEffect(() => {
    const subscribe = marketRef.onSnapshot((snapshot, err) => {
      if (err) {
        console.log('Error fetching market status', err)
      } else {
        setStatus(snapshot.get('is_open'))
      }
    })

    return () => subscribe()
  }, [])

  return status
}
