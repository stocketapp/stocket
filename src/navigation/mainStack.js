import { createStackNavigator } from 'react-navigation-stack'
import Home from 'views/Home'
import Trade from 'views/Trade'
import { BLACK } from 'utils/colors'

export default createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    Trade: {
      screen: Trade,
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
  },
)
