// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import TabBarComponent from './TabBarComponent'
// import { TrendingUpIcon, SearchIcon, ProfileIcon } from '@icons'
// import { GREEN } from '@utils/colors'
import { createStackNavigator } from '@react-navigation/stack'
import StockStack from './stacks/StockStack'

// import { Search, Profile } from '@views'
// import MainStack from './stacks/MainStack'
import TabStack from './stacks/TabStack'

const { Navigator, Screen } = createStackNavigator()

export default () => {
  return (
    <Navigator
      // tabBar={props => <TabBarComponent {...props} />}
      // tabBarOptions={{ activeTintColor: GREEN, inactiveTintColor: '#4a5a5a' }}
      initialRouteName="TabStack"
      headerMode="none"
    >
      <Screen name="TabStack" component={TabStack} />
      <Screen name="StockStack" component={StockStack} />
    </Navigator>
  )
}
