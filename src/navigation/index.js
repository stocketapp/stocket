import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import AuthStack from './authStack'
import SplashStack from './splashStack'
import MainStack from './mainStack'

export default createAppContainer(
  createSwitchNavigator(
    {
      SplashStack,
      AuthStack,
      MainStack,
    },
    {
      initialRouteName: 'SplashStack',
    },
  ),
)
