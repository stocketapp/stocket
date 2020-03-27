import React from 'react'
import { useGetPortfolio } from 'hooks'
import { createStackNavigator } from '@react-navigation/stack'
import Stock from '../Stock'
import HomeView from './HomeView'

const Stack = createStackNavigator()

export default function Home() {
  const { positions, loading } = useGetPortfolio()

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={HomeView} />
      <Stack.Screen name="Stock" component={Stock} />
    </Stack.Navigator>
  )
}
