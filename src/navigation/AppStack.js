import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabBarComponent from './TabBarComponent'
import { TrendingUpIcon, SearchIcon, ProfileIcon } from 'components/Icons'
import { GREEN } from 'utils/colors'

import Home from 'views/Home'
import Search from 'views/Search'
import Profile from 'views/Profile'

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
        animationTypeForReplace: 'pop',
      }}
    />
    <Tab.Screen
      name="Search"
      component={Search}
      options={{
        tabBarIcon: ({ color }) => <SearchIcon size={35} color={color} />,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: ({ color }) => <ProfileIcon size={36} color={color} />,
      }}
    />
  </Tab.Navigator>
)
