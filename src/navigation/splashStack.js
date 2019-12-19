import { createStackNavigator } from 'react-navigation-stack'
import SplashScreen from 'components/SplashScreen'

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
