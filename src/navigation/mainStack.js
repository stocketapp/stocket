import { createStackNavigator } from 'react-navigation-stack'
import Home from 'views/Home'

export default createStackNavigator(
  {
    screen: Home,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
)
