// @flow
import { createSwitchNavigator } from 'react-navigation'
import { BLACK } from 'utils/colors'
import AuthStack from './authStack'
import MainStack from './mainStack'

export default function(initialRouteName: string) {
  return createSwitchNavigator(
    {
      AuthStack,
      MainStack,
    },
    {
      initialRouteName,
      cardStyle: {
        backgroundColor: BLACK,
      },
    },
  )
}
