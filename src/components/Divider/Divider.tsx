import * as React from 'react';
import { View } from 'react-native'
import { GRAY_DARKER } from '@utils/colors'

interface DividerPropTypes {
  vertical?: boolean
  width?: number
}

const Divider: React.FC<DividerPropTypes> = ({ vertical = false, width = 0.5 }) => {
  const styles = {
    width: vertical ? width : '100%',
    height: vertical ? '100%' : width,
    backgroundColor: GRAY_DARKER,
    ...(vertical ? { marginHorizontal: '3%' } : { marginVertical: '2%' }),
  }

  return <View style={styles} />
}

export default Divider
