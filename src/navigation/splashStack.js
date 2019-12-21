import { createStackNavigator } from 'react-navigation-stack'
import { SplashScreen } from 'stocket-components'

export default createStackNavigator(
  {
    screen: SplashScreen,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
)
