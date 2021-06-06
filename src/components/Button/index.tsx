import { CustomButton } from './styles'
import theme from '@theme'
import Text, { ThemeColorStrings } from '../Text'
import { TouchableOpacityProps } from 'react-native'

const Button = ({
  bgColor = 'GREEN',
  textColor = 'WHITE',
  label,
  width = '85%',
  ...props
}: ButtonProps) => (
  <CustomButton
    style={{
      backgroundColor: theme.colors[bgColor],
      width,
      opacity: props.disabled ? 0.6 : 1,
    }}
    {...props}
  >
    <Text type="heading" weight="Bold" color={textColor}>
      {label}
    </Text>
  </CustomButton>
)

interface ButtonProps extends TouchableOpacityProps {
  bgColor?: ThemeColorStrings
  textColor?: ThemeColorStrings
  label: string
  width?: string | number
}

export default Button
