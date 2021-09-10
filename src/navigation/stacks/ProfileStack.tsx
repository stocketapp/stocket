import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import { Profile, AddCash } from '@views'

export type ProfileStackParamsList = {
  Profile: object | undefined
  AddCash: object | undefined
}

export type ProfileNavigationProps = NativeStackNavigationProp<ProfileStackParamsList>

const { Screen, Navigator, Group } = createNativeStackNavigator<ProfileStackParamsList>()

export default function StockStack() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Profile" component={Profile} />
      <Group screenOptions={{ presentation: 'modal' }}>
        <Screen name="AddCash" component={AddCash} />
      </Group>
    </Navigator>
  )
}
