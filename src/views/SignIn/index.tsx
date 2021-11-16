import { Image } from 'react-native'
import { AppleButton } from '@invertase/react-native-apple-authentication'
import appleSignIn from '@utils/appleSignIn'
import googleSignIn from '@utils/googleSignIn'
import { GoogleSignIn } from '@components'
import { SignInContainer, appleButtonStyles, appleLogoImgStyles } from './styles'

const logo = require('../../assets/bootsplash_logo2x.png')

const SignIn = () => (
  <SignInContainer>
    <Image source={logo} style={appleLogoImgStyles} />
    <AppleButton
      style={appleButtonStyles}
      buttonStyle={AppleButton.Style.WHITE}
      buttonType={AppleButton.Type.SIGN_IN}
      onPress={appleSignIn}
    />
    <GoogleSignIn onPress={googleSignIn} />
  </SignInContainer>
)

export default SignIn
