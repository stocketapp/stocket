// @flow
import React from 'react'
import { View } from 'react-native'
import { BACKGROUND } from 'utils/colors'
import type { ContainerProps } from '../Types'

export default (props: ContainerProps): React$Node => {
  const {
    children,
    style,
    justifyContent = 'flex-start',
    horizontal = false,
    separate = false,
    ph = false,
    top = 0,
    width = '100%',
    fullView = false,
  } = props
  const defaultStyles = {
    width,
    paddingHorizontal: ph ? 16 : 0,
    justifyContent: separate ? 'space-between' : justifyContent,
    flexDirection: horizontal ? 'row' : 'column',
    paddingTop: top,
    backgroundColor: BACKGROUND,
    ...(fullView && { flex: 1 }),
  }

  return <View style={[defaultStyles, style]}>{children}</View>
}
