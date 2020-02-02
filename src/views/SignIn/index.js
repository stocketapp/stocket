import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import appleAuth, {
  AppleButton,
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication'
import { GRAY } from 'utils/colors'

export default function SignIn() {
  async function onAppleButtonPress() {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: AppleAuthRequestOperation.LOGIN,
      requestedScopes: [
        AppleAuthRequestScope.EMAIL,
        AppleAuthRequestScope.FULL_NAME,
      ],
    })

    const { identityToken, nonce, fullName } = appleAuthRequestResponse
    if (identityToken) {
      const appleCredential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      )
      await auth().signInWithCredential(appleCredential)
      const currentUser = auth().currentUser
      const displayName = `${fullName?.givenName} ${fullName?.familyName}`
      currentUser.updateProfile({ displayName })
      await firestore()
        .doc(`Users/${currentUser?.uid}`)
        .update({
          name: displayName,
        })
    }
  }

  return (
    <View style={styles.container}>
      <Text>Sign In</Text>
      <AppleButton
        style={styles.appleButton}
        buttonStyle={AppleButton.Style.WHITE}
        buttonType={AppleButton.Type.SIGN_IN}
        onPress={onAppleButtonPress}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appleButton: {
    shadowColor: GRAY,
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
    width: '70%',
    height: 45,
  },
})
