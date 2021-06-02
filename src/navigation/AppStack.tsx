import { createNativeStackNavigator } from '@react-navigation/native-stack'
import StockStack from './stacks/StockStack'
import TabStack from './stacks/TabStack'

const { Navigator, Screen } = createNativeStackNavigator()

export default function AppStack() {
  return (
    <Navigator initialRouteName="TabStack" screenOptions={{ headerShown: false }}>
      <Screen name="TabStack" component={TabStack} />
      <Screen name="StockStack" component={StockStack} />
    </Navigator>
  )
}
