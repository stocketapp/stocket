import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Home from 'views/Home'
import Trade from 'views/Trade'
import { BLACK, GRAY_DARKER } from 'utils/colors'
import TabBarComponent from './TabBarComponent'
import { TradeIcon, HomeIcon } from 'icons'

export default createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <HomeIcon size={34} color={tintColor} />,
      },
    },
    Trade: {
      screen: Trade,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <TradeIcon size={34} color={tintColor} />
        ),
      },
    },
  },
  {
    initialRouteName: 'Home',
    cardStyle: {
      backgroundColor: BLACK,
    },
    defaultNavigationOptions: {
      header: null,
    },
    tabBarComponent: TabBarComponent,
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: GRAY_DARKER,
      keyboardHidesTabBar: true,
      style: {
        paddingVertical: 10,
      },
    },
  },
)
