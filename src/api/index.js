// @flow
import firestore from '@react-native-firebase/firestore'
import perf from '@react-native-firebase/perf'
import type { TradeDataType, DocReference } from 'types'
import { WTD_API_KEY, IEX_CLOUD_KEY } from '../../config'

async function get(query: string) {
  const url = `https://api.worldtradingdata.com/api/v1/${query}&api_token=${WTD_API_KEY}`
  const metric = await perf().newHttpMetric(url, 'GET')
  metric.putAttribute('user', 'abcd')
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

async function iexGet(query: string) {
  const iexUrl =
    process.env.NODE_ENV === 'development'
      ? 'https://sandbox.iexapis.com/stable'
      : 'https://cloud.iexapis.com/v1'
  const url = `${iexUrl}/${query}&token=${IEX_CLOUD_KEY}`
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
    console.log('[API] createTrade', err)
  }
}

export async function searchTerm(term: string, params?: string = '') {
  const res = await get(`stock_search?search_term=${term}&${params}`)
  const { data } = await res.json()
  return data
}

export async function addToWatchlist(uid: string, data: { symbol: string }) {
  const ref: DocReference = firestore().doc(`Users/${uid}`)

  try {
    await ref.collection('watchlist').add(data)
  } catch (err) {
    console.log('[API] addToWatchlist', err)
  }
}

export async function getNewsArticle(stock: string, last: number = 5) {
  const res = await iexGet(`stock/${stock}/news/last/${last}?`)
  const result = await res.json()
  return result
}

export async function getBatchStockData(
  symbols: string,
  range?: string = '1m',
  last?: number = 5,
) {
  const typeQuery = '&types=quote,news,chart'
  const rangeQuery = `${range && `&range=${range}`}`
  const url = `stock/market/batch?symbols=${symbols}${typeQuery}${rangeQuery}&last=${last}`
  const res = await iexGet(url)
  const result = await res.json()
  return result
}
