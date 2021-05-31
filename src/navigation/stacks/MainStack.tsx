import { createStackNavigator } from '@react-navigation/stack'
import { Home } from '@views'
import StockStack from './StockStack'

const { Screen, Navigator } = createStackNavigator()

export default function MainStack() {
  return (
    <Navigator headerMode="none">
      <Screen name="Home" component={Home} />
      <Screen name="StockStack" component={StockStack} />
    </Navigator>
  )
}
