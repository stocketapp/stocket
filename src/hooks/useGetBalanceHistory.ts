import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import moment from 'moment'
import { findIndex } from 'lodash'
import { currencyToNumber } from '@utils/functions'
import type { BalanceItem } from 'types'

interface UserInfo {
  portfolioChange: number
  portfolioChangePct: number
  portfolioValue: string
}

function useGetBalanceHistory(uid: string, userInfo: UserInfo) {
  const [historyItem, setHistItem] = useState<Array<BalanceItem> | null>(null)
  useEffect(() => {
    const subscribe = firestore()
      .collection(`Users/${uid}/balance_history`)
      .orderBy('date', 'asc')
      .onSnapshot(async snapshot => {
        try {
          const list: Array<BalanceItem> = []
          snapshot.forEach(doc => {
            const { date, value, change, changePct } = doc?.data()
            list.push({
              date: moment(date?.toMillis())?.format('MMM DD, YYYY'),
              value: currencyToNumber(value),
              change,
              changePct,
            })
          })
          const nowDate = moment(moment())?.format('MMM DD, YYYY') // gets the current date
          const nowBalance = {
            date: nowDate,
            value: currencyToNumber(userInfo?.portfolioValue),
            change: userInfo?.portfolioChange,
            changePct: userInfo?.portfolioChangePct,
          }
          // replace server today's balance with real-time balance
          const index = findIndex(list, el => el?.date === nowDate)
          if (index !== -1) {
            list.splice(index, 1, nowBalance)
          } else {
            list.push(nowBalance)
          }
          setHistItem(list)
        } catch (err) {
          console.log('[ERROR] useGetBalanceHistory', err)
        }
      })

    return () => subscribe()
  }, [uid, userInfo])

  return historyItem ?? []
}

export default useGetBalanceHistory
