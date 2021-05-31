import { ReactElement } from 'react'
import { TouchableOpacity, Dimensions, StyleSheet, View } from 'react-native'
import { BACKGROUND } from '@utils/colors'
import {
  BottomTabBarOptions,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs/lib/typescript/src/types'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function TabBarComponent(
  props: BottomTabBarProps<BottomTabBarOptions>,
): ReactElement {
  const { navigation, state, descriptors, activeTintColor, inactiveTintColor } = props
  const routesLength: number = state.routes.length
  const tabWidth: number = Dimensions.get('screen').width / routesLength
  const activeRoute: number = state.index
  const { bottom: insetBottom } = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingBottom: insetBottom }]}>
      {state.routes.map((route, routeIndex) => {
        const focused: boolean = activeRoute === routeIndex
        const tintColor: string =
          (focused ? activeTintColor : inactiveTintColor) ?? '#000'
        const { options } = descriptors[route.key]
        const { tabBarIcon } = options

        return (
          <TouchableOpacity
            onPress={() => navigation.navigate(route.name)}
            key={route.key}
            style={{
              width: tabWidth,
              alignItems: 'center',
              paddingVertical: '2%',
            }}
          >
            {tabBarIcon && tabBarIcon({ color: tintColor, focused, size: 30 })}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND,
    flexDirection: 'row',
  },
})
