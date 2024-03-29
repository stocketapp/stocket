import Svg, { Rect } from 'react-native-svg'
import type { SvgProps } from 'types'

const Icon = ({ size = 24, children }: SvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 26 26">
    <Rect width={size} height={size} fill="none" rx="0" ry="0" />
    {children}
  </Svg>
)

export default Icon
