import { Text as RNText, TextStyle, TextProps } from 'react-native'
import { GREEN, RED } from '@utils/colors'

const Text = ({
  type,
  color = '#fff',
  cap = false,
  status,
  children,
  style,
  weight = 'Regular',
  pt,
  pb,
  pr,
  pl,
  ...props
}: CustomTextProps) => {
  const selectFontSize = () => {
    switch (type) {
      case 'heading':
        return 24
      case 'title':
        return 20
      case 'label':
        return 18
      case 'subtext':
        return 12
      case 'big':
        return 30
      default:
        return 15
    }
  }

  const setStatus = () => {
    if (status === 'positive') {
      return GREEN
    } else if (status === 'negative') {
      return RED
    } else {
      return '#fff'
    }
  }

  const customStyle: TextStyle = {
    fontSize: selectFontSize(),
    ...(cap && {
      textTransform: 'capitalize',
      letterSpacing: 1,
    }),
    color: !status ? color : setStatus(),
    fontFamily: `SFProText-${weight}`,
    ...(pt && { paddingTop: pt }),
    ...(pb && { paddingBottom: pb }),
    ...(pr && { paddingRight: pr }),
    ...(pl && { paddingLeft: pl }),
    ...style,
  }

  return (
    <RNText style={customStyle} {...props} numberOfLines={1} ellipsizeMode="tail">
      {children}
    </RNText>
  )
}

export interface CustomTextProps extends TextProps {
  type?: 'heading' | 'title' | 'label' | 'subtext' | 'big'
  cap?: boolean
  color?: string
  children?: any
  style?: TextStyle
  status?: 'negative' | 'positive'
  pt?: number
  pb?: number
  pr?: number
  pl?: number
  weight?:
    | 'Black'
    | 'Heavy'
    | 'Bold'
    | 'Semibold'
    | 'Medium'
    | 'Regular'
    | 'Light'
    | 'Thin'
    | 'Ultralight'
}

export default Text
