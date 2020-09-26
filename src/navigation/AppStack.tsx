import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabBarComponent from './TabBarComponent'
import { TrendingUpIcon, SearchIcon, ProfileIcon } from '@icons'
import { GREEN } from '@utils/colors'

import Home from '@views/Home'
import Search from '@views/Search'
import Profile from '@views/Profile'

const { Navigator, Screen } = createBottomTabNavigator()

export default () => (
  <Navigator
    tabBar={props => <TabBarComponent {...props} />}
    tabBarOptions={{ activeTintColor: GREEN, inactiveTintColor: '#4a5a5a' }}
  >
    <Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ color }) => <TrendingUpIcon size={40} color={color} />,
      }}
    />
    <Screen
      name="Search"
      component={Search}
      options={{
        tabBarIcon: ({ color }) => <SearchIcon size={35} color={color} />,
      }}
    />
    <Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: ({ color }) => <ProfileIcon size={36} color={color} />,
      }}
    />
  </Navigator>
)
