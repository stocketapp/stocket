import { Text as RNText, TextStyle, TextProps } from 'react-native'
import { useTheme } from '@emotion/react'

const Text = ({
  type,
  color = 'WHITE',
  cap = false,
  status,
  children,
  style,
  weight = 'Regular',
  pt,
  pb,
  pr,
  pl,
  numberOfLines = 1,
  ...props
}: CustomTextProps) => {
  const theme = useTheme()
  const selectFontSize = () => {
    switch (type) {
      case 'heading':
        return 24
      case 'title':
        return 20
      case 'label':
        return 16
      case 'subtext':
        return 12
      case 'big':
        return 28
      case 'bigger':
        return 34
      case 'huge':
        return 52
      default:
        return 14
    }
  }

  const setStatus = () => {
    if (status === 'positive') {
      return theme.colors.GREEN
    } else if (status === 'negative') {
      return theme.colors.RED
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
    color: !status ? theme.colors[color] : setStatus(),
    fontFamily: `SFProText-${weight}`,
    ...(pt && { paddingTop: pt }),
    ...(pb && { paddingBottom: pb }),
    ...(pr && { paddingRight: pr }),
    ...(pl && { paddingLeft: pl }),
    ...style,
  }

  return (
    <RNText
      style={customStyle}
      {...props}
      numberOfLines={numberOfLines}
      ellipsizeMode="tail"
    >
      {children}
    </RNText>
  )
}

export interface CustomTextProps extends TextProps {
  type?: 'heading' | 'title' | 'label' | 'subtext' | 'big' | 'bigger' | 'huge'
  cap?: boolean
  color?: ThemeColorStrings
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

export type ThemeColorStrings =
  | 'BG_DARK'
  | 'BG_DARK_SECONDARY'
  | 'BG_DARK_CARD'
  | 'TEXT_DARK'
  | 'GREEN_STOCKET'
  | 'GREEN'
  | 'GRAY'
  | 'RED'
  | 'WHITE'
  | 'LIGHT_GRAY'

export default Text
