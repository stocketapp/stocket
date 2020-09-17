import { useEffect } from 'react'
import messaging from '@react-native-firebase/messaging'
import firestore from '@react-native-firebase/firestore'

const FR = firestore()

export default function useSaveApnsToken(uid: string) {
  useEffect(() => {
    const saveToken = async (token: string) => {
      await FR.collection('Users')
        .doc(uid)
        .update({
          apnsTokens: firestore.FieldValue.arrayUnion(token),
        })
    }

    const getToken = async () => {
      const token = await messaging().getToken()
      await saveToken(token)
    }
    getToken()

    return messaging().onTokenRefresh(saveToken)
  }, [uid])
}
