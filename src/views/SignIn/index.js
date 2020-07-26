import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import appleAuth, {
  AppleButton,
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication'
import { BACKGROUND } from 'utils/colors'
import logo from '../../../assets/bootsplash_logo2x.png'
import { createUserData } from 'api'

const FR = firestore()
if (__DEV__) {
  FR.settings({ host: 'localhost:4002' })
}

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
      const { uid, email } = currentUser
      const displayName = `${fullName?.givenName} ${fullName?.familyName}`
      await currentUser.updateProfile({ displayName })

      try {
        const user = await FR.doc(`Users/${uid}`).get()
        const userExists = user.exists
        if (!userExists) {
          await createUserData({
            uid,
            name: displayName,
            email,
            portfolioChange: 0,
            portfolioChangePct: 0,
          })
          await currentUser.updateProfile({ displayName })
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
