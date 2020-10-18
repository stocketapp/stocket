import { GoogleSignin } from '@react-native-community/google-signin'
import auth from '@react-native-firebase/auth'
import createUser from './createUser'

GoogleSignin.configure({
  // TODO: Replace with env variable
  webClientId: '1072088358272-dkeg7psr6ftvpbfin8p45ue943kn4ao3.apps.googleusercontent.com',
})

export default async function googleSignIn() {
  const { idToken, user } = await GoogleSignin.signIn()
  const googleCredential = auth.GoogleAuthProvider.credential(idToken)

  if (googleCredential) {
    await auth().signInWithCredential(googleCredential)
    await createUser(user)
  }
}
