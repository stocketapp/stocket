// @flow
import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import moment from 'moment'
import { uniqBy } from 'lodash'
import { currencyToNumber } from 'utils/functions'

function useGetBalanceHistory(uid: string, currentValue: string) {
  const [balanceHistory, setBalanceHistory] = useState(null)
  useEffect(() => {
    const subscribe = firestore()
      .collection(`Users/${uid}/balance_history`)
      .orderBy('date', 'asc')
      .onSnapshot(async snapshot => {
        try {
          const list = []
          snapshot.forEach(doc => {
            const data = doc.data()
            list.push({
              date: moment(data?.date).format('MMM DD, YYYY'),
              value: currencyToNumber(data?.value),
            })
          })
          const now = moment()
          list.push({
            date: moment(now).format('MMM DD, YYYY'),
            value: currencyToNumber(currentValue),
          })
          setBalanceHistory(list)
        } catch (err) {
          console.log('[ERROR] useGetBalanceHistory', err)
        }
      })

    return () => subscribe()
  }, [uid, currentValue])

  return uniqBy(balanceHistory, 'date')
}

export default useGetBalanceHistory
