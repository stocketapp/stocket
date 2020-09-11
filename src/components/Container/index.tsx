import React, { ReactNode } from 'react'
import { View, ViewStyle } from 'react-native'
import { BACKGROUND } from 'utils/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import type { ContainerProps } from '@types'

export default ({
  children,
  style,
  justifyContent = 'flex-start',
  horizontal = false,
  separate = false,
  ph = false,
  top = 0,
  bottom = 0,
  width = '100%',
  fullView = false,
  safeAreaTop = false,
  safeAreaBottom = false,
}: ContainerProps): JSX.Element => {
  const { top: insetTop, bottom: insetBottom } = useSafeAreaInsets()

  const defaultStyles: ViewStyle = {
    width,
    paddingHorizontal: ph ? 18 : 0,
    justifyContent: separate ? 'space-between' : justifyContent,
    flexDirection: horizontal ? 'row' : 'column',
    paddingTop: safeAreaTop ? insetTop : top,
    paddingBottom: safeAreaBottom ? insetBottom : bottom,
    backgroundColor: BACKGROUND,
    ...(fullView && { flex: 1 }),
  }

  return <View style={[defaultStyles, style]}>{children}</View>
}
