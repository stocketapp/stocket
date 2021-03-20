import * as React from 'react'
import { View, ViewStyle } from 'react-native'
import { BACKGROUND } from '@utils/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Container: React.FC<ContainerProps> = ({
  children,
  style,
  justifyContent = 'flex-start',
  horizontal = false,
  separate = false,
  ph = false,
  top = 0,
  bottom = 0,
  right = 0,
  left = 0,
  width = '100%',
  fullView = false,
  safeAreaTop = false,
  safeAreaBottom = false,
}) => {
  const { top: insetTop, bottom: insetBottom } = useSafeAreaInsets()

  const defaultStyles: ViewStyle = {
    width,
    justifyContent: separate ? 'space-between' : justifyContent,
    flexDirection: horizontal ? 'row' : 'column',
    paddingHorizontal: ph ? 18 : 0,
    paddingTop: safeAreaTop ? insetTop : top,
    paddingBottom: safeAreaBottom ? insetBottom : bottom,
    paddingRight: ph ? 18 : right,
    paddingLeft: ph ? 18 : left,
    ...(ph ? { paddingHorizontal: 18 } : { paddingRight: right, paddingLeft: left }),
    backgroundColor: BACKGROUND,
    ...(fullView && { flex: 1 }),
  }

  return <View style={[defaultStyles, style]}>{children}</View>
}

export interface ContainerProps {
  children: React.ReactNode
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between'
  alignItems?: 'center' | 'flex-start' | 'flex-end'
  horizontal?: boolean
  separate?: boolean
  ph?: boolean
  top?: number
  bottom?: number
  right?: number
  left?: number
  width?: string | number
  style?: ViewStyle | {}
  fullView?: boolean
  safeAreaTop?: boolean
  safeAreaBottom?: boolean
}

export default Container
