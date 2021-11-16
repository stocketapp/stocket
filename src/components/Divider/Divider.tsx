import * as React from 'react'
import { View } from 'react-native'
import theme from '@theme'

interface DividerPropTypes {
  vertical?: boolean
  width?: number
}

const Divider: React.FC<DividerPropTypes> = ({ vertical = false, width = 0.5 }) => {
  const styles = {
    width: vertical ? width : '100%',
    height: vertical ? '100%' : width,
    backgroundColor: theme.colors.GRAY,
    ...(vertical ? { marginHorizontal: '3%' } : { marginVertical: '2%' }),
  }

  return <View style={styles} />
}

export default Divider
