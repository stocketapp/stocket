import { View, StyleSheet, Image } from 'react-native'
import { AppleButton } from '@invertase/react-native-apple-authentication'
import { BACKGROUND } from '@utils/colors'
import appleSignIn from '@utils/appleSignIn'
import googleSignIn from '@utils/googleSignIn'
import { GoogleSignIn } from '@components'

const logo = require('../../assets/bootsplash_logo2x.png')

export default function SignIn() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <AppleButton
        style={styles.appleButton}
        buttonStyle={AppleButton.Style.WHITE}
        buttonType={AppleButton.Type.SIGN_IN}
        onPress={appleSignIn}
      />
      <GoogleSignIn onPress={googleSignIn} />
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
