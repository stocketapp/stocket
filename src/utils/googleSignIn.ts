import { GoogleSignin } from '@react-native-community/google-signin'
import auth from '@react-native-firebase/auth'
import createUser from './createUser'
import { GOOGLE_STOCKET_WEB_CLIENT_ID } from '../../config'

GoogleSignin.configure({
  webClientId: GOOGLE_STOCKET_WEB_CLIENT_ID,
})

export default async function googleSignIn() {
  const { idToken, user } = await GoogleSignin.signIn()
  const googleCredential = auth.GoogleAuthProvider.credential(idToken)

  if (googleCredential) {
    await auth().signInWithCredential(googleCredential)
    await createUser(user)
  }
}
