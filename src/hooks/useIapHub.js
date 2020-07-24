// @flow
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProducts } from 'react-native-iap'
import iapProductsList from 'utils/iapProductsList'

export default function useIapHub(uid: string) {
  const dispatch = useDispatch()

  useEffect(() => {
    const iapHubLogin = async () => {
      try {
        const products = await getProducts(
          iapProductsList.map(el => el.productId),
        )
        dispatch({
          type: 'SET_IAP_PRODUCTS',
          products,
        })
      } catch (err) {
        console.log(err)
      }
    }

    if (uid) {
      iapHubLogin()
    }
  }, [uid])
}
