import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import { NavigatorScreenParams } from '@react-navigation/native'
import StockStack, { StockStackParamsList } from './stacks/StockStack'
import TabStack from './stacks/TabStack'

export type AppStackParamsList = {
  TabStack: {}
  StockStack: NavigatorScreenParams<StockStackParamsList>
}

export type AppStackNavigationProps = NativeStackNavigationProp<AppStackParamsList>
const { Navigator, Screen } = createNativeStackNavigator<AppStackParamsList>()

export default function AppStack() {
  return (
    <Navigator initialRouteName="TabStack" screenOptions={{ headerShown: false }}>
      <Screen name="TabStack" component={TabStack} />
      <Screen name="StockStack" component={StockStack} />
    </Navigator>
  )
}
