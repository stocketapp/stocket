// @flow
import React from 'react'
import { View } from 'react-native'
import type { ContainerProps } from '../Types'

export default function Container(props: ContainerProps): React$Node {
  const {
    children,
    style,
    justifyContent = 'flex-start',
    horizontal = false,
    separate = false,
    ph = false,
    top = 0,
    width = '100%',
  } = props
  const defaultStyles = {
    width,
    paddingHorizontal: ph ? 20 : 0,
    justifyContent: separate ? 'space-between' : justifyContent,
    flexDirection: horizontal ? 'row' : 'column',
    paddingTop: top,
  }

  return <View style={[defaultStyles, style]}>{children}</View>
}
