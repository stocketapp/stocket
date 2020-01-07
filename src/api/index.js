// @flow
import firestore from '@react-native-firebase/firestore'
import type { TradeDataType, DocReference } from 'types'
import { WTD_API_KEY } from '../../config'

async function get(query: string) {
  const url = `https://api.worldtradingdata.com/api/v1/${query}&api_token=${WTD_API_KEY}`
  const res = await fetch(url, {
    method: 'GET',
    Accept: 'applicatiion/json',
  })

  return res
}

export async function getStock(symbols: string | Array<string>) {
  const symbolsStr = typeof symbols === 'string' ? symbols : symbols.join(',')
  const res = await get(`stock?symbol=${symbolsStr}`)
  const { data } = await res.json()
  return data
}

export async function createTrade(uid: string, data: TradeDataType) {
  const ref: DocReference = firestore().doc(`Users/${uid}`)

  try {
    await ref.collection('trades').add(data)
  } catch (err) {
    console.log('createTrade: Function -', err)
  }
}
