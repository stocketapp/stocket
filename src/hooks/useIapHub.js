/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import IapHub from 'react-native-iaphub'
import useUser from './useUser'
import { useDispatch } from 'react-redux'

export default function useIapHub() {
  const { currentUser } = useUser()
  const dispatch = useDispatch()

  useEffect(() => {
    const iapHubLogin = async () => {
      try {
        await IapHub.login(currentUser?.uid)
        const products = await IapHub.getUser()
        dispatch({
          type: 'SET_IAP_PRODUCTS',
          products: products?.productsForSale,
        })
      } catch (err) {
        console.log(err)
      }
    }

    if (currentUser) {
      iapHubLogin()
    }
  }, [currentUser])
}
