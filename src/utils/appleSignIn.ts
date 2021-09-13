import appleAuth from '@invertase/react-native-apple-authentication'
import auth from '@react-native-firebase/auth'
import createUser from './createUser'

export default async function onAppleButtonPress() {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  })

  const { identityToken, nonce, fullName } = appleAuthRequestResponse
  if (identityToken) {
    const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce)
    await auth().signInWithCredential(appleCredential)
    await createUser(fullName)
  }
}
