import { useEffect } from 'react'
import messaging from '@react-native-firebase/messaging'
import firestore from '@react-native-firebase/firestore'

const FR = firestore()

export default function useSaveApnsToken(uid: string) {
  useEffect(() => {
    const saveToken = async (token: string) => {
      await FR.collection('Users').doc(uid).update({
        apnsTokens: token,
      })
    }

    const getToken = async () => {
      try {
        const token = await messaging().getToken()
        if (uid) {
          await saveToken(token)
        }
      } catch (err) {
        console.log('getToken()', err)
      }
    }
    if (uid) {
      getToken()
    }

    return messaging().onTokenRefresh(saveToken)
  }, [uid])
}
