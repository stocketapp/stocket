import { GoogleButton, ButtonText, Container } from './styles'
import GLogo from '@assets/svg/Google_Logo.svg'

interface Props {
  onPress?: () => void
}

const GoogleSignIn = ({ onPress }: Props) => (
  <GoogleButton onPress={onPress} activeOpacity={0.7}>
    <Container>
      <GLogo height={16} width={16} style={{ marginTop: 1.5 }} />
      <ButtonText>Sign in with Google</ButtonText>
    </Container>
  </GoogleButton>
)

export default GoogleSignIn
