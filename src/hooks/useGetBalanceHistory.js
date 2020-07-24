// @flow
import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import moment from 'moment'
import { uniqBy, find, map } from 'lodash'
import { currencyToNumber } from 'utils/functions'

type UserInfo = {
  portfolioChange: number,
  portfolioChangePct: number,
  portfolioValue: string,
}

function useGetBalanceHistory(uid: string, userInfo: UserInfo) {
  const [balanceHistory, setBalanceHistory] = useState(null)
  useEffect(() => {
    const subscribe = firestore()
      .collection(`Users/${uid}/balance_history`)
      .orderBy('date', 'asc')
      .onSnapshot(async snapshot => {
        try {
          const list = []
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
          const newArr = map(list, el => {
            if (el.date === nowDate) {
              return Object.assign({}, nowBalance)
            }
            return el
          })
          setBalanceHistory(newArr)
        } catch (err) {
          console.log('[ERROR] useGetBalanceHistory', err)
        }
      })

    return () => subscribe()
  }, [uid, userInfo])

  return balanceHistory
}

export default useGetBalanceHistory
