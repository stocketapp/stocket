import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabBarComponent from './TabBarComponent'
import { TrendingUpIcon, SearchIcon } from 'components/Icons'
import { GREEN } from 'utils/colors'

import Home from 'views/Home'
// import Trade from 'views/Trade'
import Search from 'views/Search'

const Tab = createBottomTabNavigator()

export default () => (
  <Tab.Navigator
    tabBar={props => <TabBarComponent {...props} />}
    tabBarOptions={{ activeTintColor: GREEN, inactiveTintColor: '#4a5a5a' }}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ color }) => <TrendingUpIcon size={40} color={color} />,
      }}
    />
    {/* <Tab.Screen
      name="Trade"
      component={Trade}
      options={{
        tabBarIcon: ({ color }) => <TradeIcon size={50} color={color} />,
      }}
    /> */}
    <Tab.Screen
      name="Search"
      component={Search}
      options={{
        tabBarIcon: ({ color }) => <SearchIcon size={35} color={color} />,
      }}
    />
  </Tab.Navigator>
)
