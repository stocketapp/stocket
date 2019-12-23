// @flow
import React from 'react'
import { Text as RNText } from 'react-native'
import { GREEN } from 'utils/colors'

type TextProps = {
  type?: string,
  cap?: boolean,
  color?: string,
  positive?: boolean,
  negative?: boolean,
  children?: Text.propTypes.children,
}

const Text = ({
  type,
  color = '#fff',
  cap = false,
  positive = false,
  negative = false,
  children,
  style,
  ...props
}: TextProps) => {
  const selectFontSize = () => {
    switch (type) {
      case 'heading':
        return 24
      case 'title':
        return 20
      case 'subtitle':
        return 18
      case 'subtitleGray':
        return 18
      default:
        return 14
    }
  }

  const statusColor = (positive && GREEN) || (negative && '#eb455a')
  const customStyle = {
    fontFamily: 'Futura',
    fontSize: selectFontSize(),
    ...(cap && {
      textTransform: 'capitalize',
      letterSpacing: 0.3,
    }),
    ...style,
    color: !statusColor ? color : statusColor,
  }

  return <RNText style={customStyle}>{children}</RNText>
}

export default Text
