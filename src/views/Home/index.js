import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'

export default function Home() {
  const container = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }

  return (
    <View style={container}>
      <Text>Home</Text>
    </View>
  )
}
