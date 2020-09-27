import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import appleAuth, { AppleButton } from '@invertase/react-native-apple-authentication'
import { BACKGROUND } from '@utils/colors'
import { createUserData } from '@api'

const logo = require('../../assets/bootsplash_logo2x.png')

const FR = firestore()
if (__DEV__) {
  FR.settings({ host: 'localhost:4002', cacheSizeBytes: 2000, ssl: false, persistence: true })
}

export default function SignIn() {
  async function onAppleButtonPress() {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    })

    const { identityToken, nonce, fullName } = appleAuthRequestResponse
    if (identityToken) {
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce)
      await auth().signInWithCredential(appleCredential)
      const currentUser = auth().currentUser
      const displayName = `${fullName?.givenName} ${fullName?.familyName}`

      try {
        const user = await FR.doc(`Users/${currentUser?.uid}`).get()
        const userExists = user.exists
        if (!userExists) {
          await createUserData({
            uid: currentUser?.uid,
            name: displayName,
            email: currentUser?.email,
          })
          await currentUser?.updateProfile({ displayName })
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
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
    backgroundColor: BACKGROUND,
  },
  appleButton: {
    shadowColor: BACKGROUND,
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
    width: '70%',
    height: 45,
  },
  logo: {
    resizeMode: 'contain',
    height: 160,
    marginBottom: '40%',
  },
})
