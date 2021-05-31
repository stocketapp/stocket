import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { TabBar } from '@components'
import { TrendingUpIcon, SearchIcon, ProfileIcon } from '@icons'
import { GREEN } from '@utils/colors'

import { Search, Profile } from '@views'
import MainStack from './MainStack'

const { Navigator, Screen } = createBottomTabNavigator()

export default () => {
  return (
    <Navigator
      tabBar={props => <TabBar {...props} />}
      tabBarOptions={{ activeTintColor: GREEN, inactiveTintColor: '#4a5a5a' }}
    >
      <Screen
        name="MainStack"
        component={MainStack}
        options={{
          tabBarIcon: ({ color }) => <TrendingUpIcon size={40} color={color} />,
        }}
      />
      <Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color }) => <SearchIcon size={35} color={color} />,
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => <ProfileIcon size={36} color={color} />,
        }}
      />
    </Navigator>
  )
}
