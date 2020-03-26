import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabBarComponent from './TabBarComponent'
import { TrendingUpIcon, TradeIcon } from 'components/Icons'
import { GRAY_DARKER, GREEN } from 'utils/colors'

import Home from 'views/Home'
import Trade from 'views/Trade'

const Tab = createBottomTabNavigator()

export default () => (
  <Tab.Navigator
    tabBar={props => <TabBarComponent {...props} />}
    tabBarOptions={{ activeTintColor: GREEN }}
    activeColor="blue"
    inactiveColor={GRAY_DARKER}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ color }) => <TrendingUpIcon size={36} color={color} />,
      }}
    />
    <Tab.Screen
      name="Trade"
      component={Trade}
      options={{
        tabBarIcon: ({ color }) => <TradeIcon size={36} color={color} />,
      }}
    />
  </Tab.Navigator>
)
