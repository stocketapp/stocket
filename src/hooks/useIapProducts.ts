import { useEffect, useCallback } from 'react'
import IapHub from 'react-native-iaphub'
import { productsVar } from '@cache'
import { useReactiveVar } from '@apollo/client'

export default function useIapProducts(uid: string) {
  const products = useReactiveVar(productsVar)

  const iapProducts = useCallback(async () => {
    try {
      await IapHub.setUserId(uid)
      const res = await IapHub.getProductsForSale()
      productsVar(res)
    } catch (err) {
      console.error('Something went wrong while fetching IAP prodcuts', err)
      console.info('[FUNCTION] iapProducts -> useIapProducts.ts')
    }
  }, [uid])

  useEffect(() => {
    if (products.length === 0) {
      iapProducts()
    }
  }, [iapProducts, products])

  return products
}
