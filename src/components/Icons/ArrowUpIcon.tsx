import { Path } from 'react-native-svg'
import type { IconProps } from 'types'
import Icon from './Icon'

export default ({ size, color = '#fff' }: IconProps) => (
  <Icon size={size} color={color}>
    <Path
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke-width="1"
      stroke={color}
      d="M12 3V21"
    />
    <Path
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke-width="1"
      stroke={color}
      d="M6 9L12 3L18 9"
    />
  </Icon>
)
