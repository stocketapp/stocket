import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import { Profile, AddCash, PurchasesHistory, TradesHistory } from '@views'

export type ProfileStackParamsList = {
  Profile: object | undefined
  AddCash: object | undefined
  PurchasesHistory: object | undefined
  TradesHistory: object | undefined
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
        <Screen name="PurchasesHistory" component={PurchasesHistory} />
        <Screen name="TradesHistory" component={TradesHistory} />
      </Group>
    </Navigator>
  )
}
