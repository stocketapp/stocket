/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as RNIap from 'react-native-iap'
import iapProductsList from '@utils/iapProductsList'

export default function useIapProducts(uid: string) {
  const dispatch = useDispatch()

  useEffect(() => {
    const initIAP = async () => {
      try {
        await RNIap.initConnection()
      } catch (err) {
        console.log('initIAP', err)
      }
    }
    initIAP()
  }, [])

  useEffect(() => {
    const iapProducts = async () => {
      const products: Array<RNIap.Product> = []
      try {
        const result = await RNIap.getProducts(iapProductsList.map(el => el.productId))
        result.map(el => {
          let prod = { productPrice: 0, ...el }
          prod.productPrice = Number(el.price)
          products.push(el)
        })
        dispatch({
          type: 'SET_IAP_PRODUCTS',
          products,
        })
      } catch (err) {
        console.log('fetch iapProducts', err)
      }
    }

    if (uid) {
      iapProducts()
    }
  }, [uid])
}
