import { createStackNavigator } from '@react-navigation/stack'
import { Home } from '@views'

const { Screen, Navigator } = createStackNavigator()

export default function MainStack() {
  return (
    <Navigator headerMode="none">
      <Screen name="Home" component={Home} />
    </Navigator>
  )
}
