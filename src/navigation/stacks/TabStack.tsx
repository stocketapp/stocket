import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from '@emotion/react'
import { TrendingUpIcon, SearchIcon, ProfileIcon } from '@icons'
import { Search } from '@views'
import TabBar from '../TabBar'
import MainStack from './MainStack'
import ProfileStack from './ProfileStack'

const { Navigator, Screen } = createBottomTabNavigator()

const TabStack = () => {
  const { colors } = useTheme()
  return (
    <Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: colors.GREEN,
        headerShown: false,
      }}
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
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color }) => <ProfileIcon size={36} color={color} />,
        }}
      />
    </Navigator>
  )
}

export default TabStack
