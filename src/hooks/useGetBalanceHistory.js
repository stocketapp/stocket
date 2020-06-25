// @flow
import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import moment from 'moment'
import { uniqBy, sortBy } from 'lodash'

function useGetBalanceHistory(uid: string, currentValue: string) {
  const [balanceHistory, setBalanceHistory] = useState(null)
  useEffect(() => {
    const subscribe = firestore()
      .collection(`Users/${uid}/balance_history`)
      .onSnapshot(async snapshot => {
        try {
          const list = []
          snapshot.forEach(doc => {
            let obj = {}
            const data = doc.data()
            obj.date = moment.utc(data.date).format('MMM DD, YYYY')
            obj.value = data.value
            list.push(obj)
          })
          const today = Date.now()
          list.push({
            date: moment.utc(today).format('MMM DD, YYYY'),
            value: currentValue,
          })
          setBalanceHistory(list)
        } catch (err) {
          console.log('[ERROR] useGetBalanceHistory', err)
        }
      })

    return () => subscribe()
  }, [uid, currentValue])

  return sortBy(uniqBy(balanceHistory, 'date'), 'date')
}

export default useGetBalanceHistory
