import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from '@views'

const { Screen, Navigator } = createNativeStackNavigator()

export default function MainStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
    </Navigator>
  )
}
