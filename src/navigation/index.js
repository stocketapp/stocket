// @flow
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { BLACK } from 'utils/colors'
import AuthStack from './authStack'
import SplashStack from './splashStack'
import MainStack from './mainStack'

// export default createAppContainer(
//   createSwitchNavigator(
//     {
//       SplashStack,
//       AuthStack,
//       MainStack,
//     },
//     {
//       initialRouteName: 'SplashStack',
//     },
//   ),
// )

export default function(initialRouteName: string) {
  return createSwitchNavigator(
    {
      SplashStack,
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
