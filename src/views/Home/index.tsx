import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Stock from '../Stock'
import HomeView from './HomeView'

const { Screen, Navigator } = createStackNavigator()

export default function Home() {
  return (
    <Navigator headerMode="none">
      <Screen name="Home" component={HomeView} />
      <Screen name="Stock" component={Stock} />
    </Navigator>
  )
}
