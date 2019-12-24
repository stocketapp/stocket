// @flow
import React from 'react'
import { View } from 'react-native'
import type { ContainerProps } from './Types'

export default function Container(props: ContainerProps): React$Node {
  const {
    children,
    style,
    justifyContent = 'flex-start',
    alignItems = 'flex-start',
    horizontal = false,
    separate = false,
    noPh = false,
  } = props
  const defaultStyles = {
    width: '100%',
    paddingHorizontal: noPh ? 0 : 20,
    justifyContent: separate ? 'space-between' : justifyContent,
    alignItems,
    flexDirection: horizontal ? 'row' : 'column',
  }

  return <View style={[defaultStyles, style]}>{children}</View>
}
