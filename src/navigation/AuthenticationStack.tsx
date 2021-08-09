import { SignIn } from '@views'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const { Screen, Navigator } = createNativeStackNavigator()

export default () => (
  <Navigator>
    <Screen
      name="Login"
      component={SignIn}
      options={{ headerShown: false, animationTypeForReplace: 'pop' }}
    />
  </Navigator>
)
