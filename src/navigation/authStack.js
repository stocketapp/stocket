import React from 'react'
import SignIn from 'views/SignIn'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

export default () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={SignIn}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
)
