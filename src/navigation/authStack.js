// import { create } from 'react-navigation'
import SignIn from 'views/SignIn'
import { createStackNavigator } from 'react-navigation-stack'

export default createStackNavigator(
  {
    SignIn: {
      screen: SignIn,
    },
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
)
