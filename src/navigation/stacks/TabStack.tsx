import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabBar from '../TabBar'
import { TrendingUpIcon, SearchIcon, ProfileIcon } from '@icons'
import { useTheme } from '@emotion/react'
import { Search, Profile } from '@views'
import MainStack from './MainStack'

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
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => <ProfileIcon size={36} color={color} />,
        }}
      />
    </Navigator>
  )
}

export default TabStack
