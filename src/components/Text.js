// @flow
import React from 'react'
import { Text as RNText } from 'react-native'
import { GREEN, RED } from 'utils/colors'
import type { TextProps } from 'types'

const Text = ({
  type,
  color = '#fff',
  cap = false,
  status,
  children,
  style,
  weight = '500',
  ...props
}: TextProps) => {
  const selectFontSize = () => {
    switch (type) {
      case 'heading':
        return 20
      case 'title':
        return 18
      case 'label':
        return 16
      case 'subtext':
        return 12
      case 'big':
        return 24
      default:
        return 14
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

  const customStyle = {
    fontSize: selectFontSize(),
    ...(cap && {
      textTransform: 'capitalize',
      letterSpacing: 1,
    }),
    fontWeight: weight,
    color: !status ? color : setStatus(),
    fontFamily: 'Futura',
    ...style,
  }

  return (
    <RNText style={customStyle} {...props}>
      {children}
    </RNText>
  )
}

export default Text
