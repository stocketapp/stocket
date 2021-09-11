import { useEffect, useCallback, useState } from 'react'
import IapHub from 'react-native-iaphub'
import { productsVar } from '@cache'
import { IAPHUB_API_KEY, IAPHUB_APPID, IAPHUB_ENV } from '../../config'

export default function useIapProducts(uid: string) {
  const [isInit, setIsInit] = useState(false)

  const initIap = useCallback(async () => {
    try {
      await IapHub.init({
        appId: IAPHUB_APPID,
        apiKey: IAPHUB_API_KEY,
        environment: IAPHUB_ENV,
      })
      setIsInit(true)
    } catch (err) {
      setIsInit(false)
      console.error('Something went wrong initializing IAP', err)
      console.info('[FUNCTION] initIap -> useIapProducts.ts')
    }
  }, [])

  const iapProducts = useCallback(async () => {
    try {
      await IapHub.setUserId(uid)
      const products = await IapHub.getProductsForSale()
      productsVar(products)
    } catch (err) {
      console.error('Something went wrong while fetching IAP prodcuts', err)
      console.info('[FUNCTION] iapProducts -> useIapProducts.ts')
    }
  }, [uid])

  useEffect(() => {
    initIap()
  }, [initIap])

  useEffect(() => {
    if (isInit && uid) {
      iapProducts()
    }
  }, [iapProducts, isInit, uid])
}
