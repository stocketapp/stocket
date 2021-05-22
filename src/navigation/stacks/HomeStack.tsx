import { createStackNavigator } from '@react-navigation/stack'
import { Home, Stock } from '@views'

const { Screen, Navigator } = createStackNavigator()

export default function HomeStack() {
  return (
    <Navigator headerMode="none">
      <Screen name="Home" component={Home} />
      <Screen name="Stock" component={Stock} />
    </Navigator>
  )
}
