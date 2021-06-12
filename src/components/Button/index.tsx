import { CustomButton } from './styles'
import theme from '@theme'
import Text, { ThemeColorStrings } from '../Text'
import { TouchableOpacityProps } from 'react-native'
import LottieView from 'lottie-react-native'

const Button = ({
  bgColor = 'GREEN',
  textColor = 'WHITE',
  label,
  width = '85%',
  loading,
  ...props
}: ButtonProps) => (
  <CustomButton
    style={{
      backgroundColor: theme.colors[bgColor],
      width,
      opacity: props.disabled ? 0.8 : 1,
    }}
    {...props}
  >
    {loading ? (
      <LottieView
        source={require('@assets/lottie/spinner.json')}
        style={{ height: 30, width: 30 }}
        autoPlay
        loop
      />
    ) : (
      <Text type="heading" weight="Bold" color={textColor}>
        {label}
      </Text>
    )}
  </CustomButton>
)

interface ButtonProps extends TouchableOpacityProps {
  bgColor?: ThemeColorStrings
  textColor?: ThemeColorStrings
  label: string
  width?: string | number
  loading?: boolean | undefined
}

export default Button
