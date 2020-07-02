// @flow
import firestore from '@react-native-firebase/firestore'
import perf from '@react-native-firebase/perf'
import type { TradeDataType, DocReference } from 'types'
import { IEX_CLOUD_KEY } from '../../config'
import { formatCurrency } from 'utils/functions'
import functions from '@react-native-firebase/functions'

const FR = firestore()

if (__DEV__) {
  functions().useFunctionsEmulator('http://localhost:4001')
  FR.settings({ host: 'localhost:4002', persistence: true, ssl: false })
}

async function iexGet(endpoint: string, query?: string = '') {
  const iexUrl = __DEV__
    ? 'https://sandbox.iexapis.com/stable'
    : 'https://cloud.iexapis.com/v1'
  const q = query !== '' ? `&${query}` : ''
  const url = `${iexUrl}/${endpoint}?token=${IEX_CLOUD_KEY}${q}`
  const metric = await perf().newHttpMetric(url, 'GET')
  const res = await fetch(url, {
    method: 'GET',
    Accept: 'applicatiion/json',
  })
  metric.setHttpResponseCode(res.status)
  metric.setResponseContentType(res.headers.get('Content-Type'))
  metric.setResponsePayloadSize(res.headers.get('Content-Length'))

  await metric.stop()
  return res
}

export async function createTrade(
  uid: string,
  data: TradeDataType,
  callback?: () => void,
) {
  const ref: DocReference = FR.doc(`Users/${uid}`)

  try {
    await ref.collection('trades').add(data)

    if (callback) {
      callback()
    }
  } catch (err) {
    console.log('[API] createTrade', err)
  }
}

export async function searchTerm(term: string) {
  const res = await iexGet(`search/${term}`)
  // Change this to use the search API once I upgrade to paid plan
  // const range = '1d'
  // const typeQuery = '&types=quote,news,chart,intraday-prices'
  // const rangeQuery = `${range && `&range=${range}`}`
  // const url = `symbols=${term}${typeQuery}${rangeQuery}&last=5&chartInterval=5&chartIEXWhenNull=true`
  // const res = await iexGet('stock/market/batch', url)
  console.log(res)
  const result = await res.json()
  console.log(result)
  return result
}

export async function addToWatchlist(uid: string, symbol: string) {
  const ref: DocReference = FR.doc(`Users/${uid}`)

  try {
    await ref.collection('watchlist').doc(symbol).set({ symbol })
  } catch (err) {
    console.log('[API] addToWatchlist', err)
  }
}

export async function removeFromWatchlist(uid: string, symbol: string) {
  const ref: DocReference = FR.doc(`Users/${uid}`)

  try {
    await ref.collection('watchlist').doc(symbol).delete()
  } catch (err) {
    console.log('[API] addToWatchlist', err)
  }
}

export async function getNewsArticle(stock: string, last: number = 5) {
  const res = await iexGet(`stock/${stock}/news/last/${last}`)
  const result = await res.json()
  return result
}

export async function getBatchStockData(
  symbols: string,
  range?: string = '1d',
  last?: number = 5,
) {
  const typeQuery = '&types=quote,news,chart,intraday-prices'
  const rangeQuery = `${range && `&range=${range}`}`
  const url = `symbols=${symbols}${typeQuery}${rangeQuery}&last=${last}&chartInterval=5&chartIEXWhenNull=true`
  const res = await iexGet('stock/market/batch', url)
  const result = await res.json()
  return result
}

type CreateUserType = { uid: string, name: string, email: string }
export async function createUserData({ uid, name, email }: CreateUserType) {
  const userRef: DocReference = FR.doc(`Users/${uid}`)
  const cash = 15000
  try {
    await userRef.set({
      combinedValue: formatCurrency(cash),
      portfolioValue: formatCurrency(0),
      name,
      cash,
      email,
      uid,
    })
  } catch (err) {
    console.log('[Error] onCreateUserTrigger()', err)
  }
}

export function callUpdateGains(uid: string) {
  const onUpdateGainsCall = functions().httpsCallable('onUpdateGainsCall')
  onUpdateGainsCall({ uid })
}

type UpdatePositionTypes = {
  uid: string,
  symbol: string,
  data: {},
}
export async function updatePosition(params: UpdatePositionTypes) {
  const { uid, symbol, data } = params
  const positionsRef: DocReference = FR.doc(`Users/${uid}/positions/${symbol}`)
  try {
    await positionsRef.update(data)
  } catch (err) {
    console.log('[Error] updatePosition()', err)
  }
}
