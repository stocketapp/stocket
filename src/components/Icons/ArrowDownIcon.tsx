import { Path } from 'react-native-svg'
import type { IconProps } from 'types'
import Icon from './Icon'

export default ({ size, color = '#fff' }: IconProps) => (
  <Icon size={size} color={color}>
    <Path
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke-width="2"
      stroke={color}
      d="M12 3V21"
    />
    <Path
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke-width="2"
      stroke={color}
      d="M6 15L12 21L18 15"
    />
  </Icon>
)
