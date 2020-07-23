// @flow
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import IapHub from 'react-native-iaphub'
import { useDispatch } from 'react-redux'

export default function useIapHub(uid: string) {
  const dispatch = useDispatch()

  useEffect(() => {
    const iapHubLogin = async () => {
      try {
        await IapHub.login(uid)
        const user = await IapHub.getUser()
        dispatch({
          type: 'SET_IAP_PRODUCTS',
          products: user?.productsForSale,
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
