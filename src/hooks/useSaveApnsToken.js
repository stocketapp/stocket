import { useEffect } from 'react'
import messaging from '@react-native-firebase/messaging'
import firestore from '@react-native-firebase/firestore'

const FR = firestore()

export default function useSaveApnsToken(uid) {
  useEffect(() => {
    const saveToken = async token => {
      await FR.collection('Users')
        .doc(uid)
        .update({
          apnsTokens: firestore.FieldValue.arrayUnion(token),
        })
    }

    const getToken = async () => {
      const token = await messaging().getToken()
      console.log(token)
      await saveToken(token)
    }

    getToken()

    return messaging().onTokenRefresh(token => {
      saveToken(token)
    })
  }, [uid])
}
