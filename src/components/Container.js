// @flow
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { BLACK } from 'utils/colors'

type ContainerProps = {
  children: React$Node,
  style?: View.propTypes.style,
}

export default function Container(props: ContainerProps): React$Node {
  const defaultStyles = {
    paddingHorizontal: 20,
  }
  const { children, style } = props

  return <View style={[defaultStyles, style]}>{children}</View>
}
