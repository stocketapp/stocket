import React from 'react'
import { View } from 'react-native'
import { GRAY_DARKER } from 'utils/colors'

type DividerPropTypes = {
  vertical?: boolean,
  width?: number,
}

export default ({ vertical = false, width = 0.5 }: DividerPropTypes) => {
  const styles = {
    width: vertical ? width : '100%',
    height: vertical ? '100%' : width,
    backgroundColor: GRAY_DARKER,
    ...(vertical ? { marginHorizontal: 15 } : { marginVertical: 15 }),
  }

  return <View style={styles} />
}
