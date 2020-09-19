// @flow
import AsyncStorage from '@react-native-community/async-storage'
import messaging from '@react-native-firebase/messaging'
import { find } from 'lodash'
import iapProductsList from './iapProductsList'

export function formatCurrency(num: number | string): string {
  return Number(num ?? 0).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

export async function getFcmToken() {
  let fcmToken = await AsyncStorage.getItem('fcmToken')
  if (!fcmToken) {
    fcmToken = await messaging().getToken()
    if (fcmToken) {
      await AsyncStorage.setItem('fcmToken', fcmToken)
    }
  }
}

export async function requestNotificationPermission() {
  try {
    await messaging().requestPermission()
    getFcmToken()
  } catch (error) {
    console.log('permission rejected')
  }
}

interface ProductValue {
  productId: string
  value: number
}

export function getProductValue(productId: string): ProductValue | null {
  const result = find(iapProductsList, el => el.productId === productId) ?? null
  return result
}

export function currencyToNumber(value: string): number {
  const number = parseFloat(value?.replace(/[$,]/g, ''))
  return number ?? 0
}

export function sumCurrency(a: string, b: string): string {
  const sum = currencyToNumber(a) + currencyToNumber(b)
  return formatCurrency(sum)
}
