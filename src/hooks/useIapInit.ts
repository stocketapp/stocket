import { useEffect, useCallback } from 'react'
import IapHub from 'react-native-iaphub'
import { IAPHUB_STOCKET_API_KEY, IAPHUB_STOCKET_APP_ID, IAPHUB_ENV } from '../../config'

export default function useIapProducts(uid: string) {
  const initIap = useCallback(async () => {
    try {
      await IapHub.init({
        appId: IAPHUB_STOCKET_APP_ID,
        apiKey: IAPHUB_STOCKET_API_KEY,
        environment: IAPHUB_ENV,
      })
    } catch (err) {
      console.error('Something went wrong initializing IAP', err)
      console.info('[FUNCTION] initIap -> useIapProducts.ts')
    }
  }, [])

  const setUser = useCallback(async () => {
    try {
      await IapHub.setUserId(uid)
    } catch (err) {
      console.error('Something went wrong while fetching IAP prodcuts', err)
      console.info('[FUNCTION] setUser -> useIapProducts.ts')
    }
  }, [uid])

  useEffect(() => {
    initIap()
  }, [initIap])

  useEffect(() => {
    if (uid) {
      setUser()
    }
  }, [setUser, uid])
}
