// @flow
import React from 'react'
import { Text as RNText, TextStyle } from 'react-native'
import { GREEN, RED } from '@utils/colors'
import type { CustomTextProps } from 'types'

const Text = ({
  type,
  color = '#fff',
  cap = false,
  status,
  children,
  style,
  weight = 'Regular',
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
        return 26
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
    ...style,
  }

  return (
    <RNText style={customStyle} {...props}>
      {children}
    </RNText>
  )
}

export default Text
