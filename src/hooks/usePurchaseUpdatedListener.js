/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { getProductValue } from 'utils/functions'
import firestore from '@react-native-firebase/firestore'
import * as RNIap from 'react-native-iap'
import IapHub from 'react-native-iaphub'
import useUser from './useUser'

export default function usePurchaseUpdatedListener() {
  const { currentUser } = useUser()

  useEffect(() => {
    const iapHubLogin = async () => {
      await IapHub.login(currentUser?.uid)
      await IapHub.getUser()
    }
    const purchaseUpdatedListener = RNIap.purchaseUpdatedListener(
      finishPurchase,
    )

    if (currentUser) {
      iapHubLogin()
    }
    return () => purchaseUpdatedListener.remove()
  }, [currentUser])

  const finishPurchase = async purchase => {
    try {
      await updateCash(purchase?.productId)
      await RNIap.finishTransaction(purchase, true)
    } catch (err) {
      console.log('purchaseUpdatedListener', err)
    }
  }

  const updateCash = async productId => {
    const value = getProductValue(productId).value
    return firestore()
      .collection('Users')
      .doc(currentUser?.uid)
      .update({
        cash: firestore.FieldValue.increment(value),
      })
  }
}
