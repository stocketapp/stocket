// @flow
import AsyncStorage from '@react-native-community/async-storage'
import messaging from '@react-native-firebase/messaging'
import { find } from 'lodash'
import purchaseValues from './purchaseValues'

export function formatCurrency(num: number | string) {
  return Number(num).toLocaleString('en-US', {
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

type ProductValue = {
  productId: string,
  value: number,
}

export function getProductValue(productId: string): ProductValue {
  const result = find(purchaseValues, el => el.productId === productId)
  return result
}
