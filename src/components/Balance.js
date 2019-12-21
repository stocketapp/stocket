import React from 'react'
import { View } from 'react-native'
import { GRAY_DARKER } from 'utils/colors'
import Text from './Text'

const Balance = () => {
  const container = { paddingHorizontal: 18 }

  return (
    <View style={container}>
      <Text color={GRAY_DARKER} type="subtitle">
        Balance
      </Text>
      <Text type="heading">$2,084.86</Text>
    </View>
  )
}

export default Balance
