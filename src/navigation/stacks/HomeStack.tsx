import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Stock, Home } from '@views'

const { Screen, Navigator } = createStackNavigator()

export default function HomeStack() {
  return (
    <Navigator headerMode="none">
      <Screen name="Home" component={Home} />
      <Screen name="Stock" component={Stock} />
    </Navigator>
  )
}
