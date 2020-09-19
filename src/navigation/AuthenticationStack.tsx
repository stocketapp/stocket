import React from 'react'
import SignIn from 'views/SignIn'
import { createStackNavigator } from '@react-navigation/stack'

const { Screen, Navigator } = createStackNavigator()

export default () => (
  <Navigator>
    <Screen
      name="Login"
      component={SignIn}
      options={{ headerShown: false, animationTypeForReplace: 'pop' }}
    />
  </Navigator>
)
