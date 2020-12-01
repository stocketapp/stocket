import firestore from '@react-native-firebase/firestore'
import perf from '@react-native-firebase/perf'
import type { TradeDataType, DocReference } from 'types'
import { IEX_CLOUD_KEY, IEX_URL } from '../../config'
import { formatCurrency } from '@utils/functions'
import functions from '@react-native-firebase/functions'

const FR = firestore()

if (__DEV__) {
  // functions().useFunctionsEmulator('http://localhost:4001')
  // FR.settings({
  //   host: 'localhost:4002',
  //   cacheSizeBytes: firestore.CACHE_SIZE_UNLIMITED,
  //   ssl: false,
  //   persistence: true,
  // })
}

async function iexGet(endpoint: string, query: string = '') {
  const iexUrl = IEX_URL
  const q = query !== '' ? `&${query}` : ''
  const url = `${iexUrl}/${endpoint}?token=${IEX_CLOUD_KEY}${q}`
  const metric = await perf().newHttpMetric(url, 'GET')
  const res = await fetch(url, {
    method: 'GET',
  })
  metric.setHttpResponseCode(res.status)
  metric.setResponseContentType(res.headers.get('Content-Type'))
  metric.setResponsePayloadSize(Number(res.headers.get('Content-Length')))

  await metric.stop()
  return res
}

type CreateTradeArg = {
  uid: string
  data: TradeDataType
}

export async function createTrade(
  { uid, data }: CreateTradeArg,
  onFinally?: () => void,
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
  } finally {
    if (onFinally) {
      onFinally()
    }
  }
}

export async function searchTerm(term: string | null) {
  const trace = await perf().startTrace('IEX_TRACE')
  trace.putAttribute('search_term', term ?? '')
  const res = await iexGet(`search/${term}`)
  trace.putAttribute('search_response', String(res.status))
  const result = await res.json()
  trace.putMetric('url_hit', 1)
  await trace.stop()
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

export async function getBatchStockData(symbols: string, range: string = '1d', last: number = 5) {
  const typeQuery = '&types=quote,news,chart,intraday-prices'
  const rangeQuery = `${range && `&range=${range}`}`
  const url = `symbols=${symbols}${typeQuery}${rangeQuery}&last=${last}&chartInterval=5&chartIEXWhenNull=true`
  const res = await iexGet('stock/market/batch', url)
  const result = await res.json()
  return result
}

export async function getHistoricalData(symbol: string, range: string) {
  const res = await iexGet(`stock/${symbol}/chart/${range}`)
  const result = await res.json()
  return result
}

interface CreateUserType {
  uid?: string
  name?: string
  email?: string | null
  // portfolioValue: number
  // portfolioChangePct: number
}
export async function createUserData({ uid, name, email }: CreateUserType) {
  const userRef: DocReference = FR.doc(`Users/${uid}`)
  const cash = 25000
  try {
    await userRef.set({
      combinedValue: formatCurrency(cash),
      portfolioValue: formatCurrency(0),
      name,
      cash,
      email,
      uid,
      portfolioChange: 0,
      portfolioChangePct: 0,
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
  uid: string
  symbol: string
  data: {}
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

// type ReceiptValidationType = {
//   receipt: string
//   uid: string
//   sku: string
// }
// export async function iapHubValidateReceipt(data: ReceiptValidationType) {
//   const { uid, receipt: token, sku } = data
//   const body = {
//     environment: IAPHUB_ENV,
//     platform: 'ios',
//     token,
//     sku,
//   }
//   const url = 'https://api.iaphub.com/app'
//   const res = await fetch(`${url}/${IAPHUB_APPID}/user/${uid}/receipt`, {
//     method: 'POST',
//     headers: {
//       Authorization: `ApiKey ${IAPHUB_API_KEY}`,
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body,
//   })
//   const result = await res.json()
//   return result
// }
