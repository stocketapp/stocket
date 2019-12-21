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

  const selectStatus = () => {
    if (positive) {
      return GREEN
    } else if (negative) {
      return '#eb455a'
    } else {
      return color
    }
  }

  const statusColor = (positive && GREEN) || (negative && '#eb455a')
  const style = {
    fontFamily: 'Futura',
    fontSize: selectFontSize(),
    color: !statusColor ? color : statusColor,
    ...(cap && {
      textTransform: 'capitalize',
      letterSpacing: 0.3,
    }),
    ...props.style,
  }

  return (
    <RNText style={style} {...props}>
      {children}
    </RNText>
  )
}

export default Text
