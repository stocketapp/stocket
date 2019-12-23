// @flow
import React from 'react'
import { View } from 'react-native'

type ContainerProps = {
  children: React$Node,
  style?: View.propTypes.style,
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between',
  alignItems?: 'center' | 'flex-start' | 'flex-end',
}

export default function Container(props: ContainerProps): React$Node {
  const {
    children,
    style,
    justifyContent = 'flex-start',
    alignItems = 'flex-start',
  } = props
  const defaultStyles = {
    paddingHorizontal: 20,
    justifyContent,
    alignItems,
  }

  return <View style={[defaultStyles, style]}>{children}</View>
}
