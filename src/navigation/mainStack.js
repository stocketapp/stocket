import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from 'views/Home'
import Trade from 'views/Trade'

const Tab = createBottomTabNavigator()

export default () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Trade" component={Trade} />
  </Tab.Navigator>
)
