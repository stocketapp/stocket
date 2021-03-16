import { ReactElement } from 'react';
import { TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import { Container } from '@components'
import { BACKGROUND } from '@utils/colors'
import {
  BottomTabBarOptions,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs/lib/typescript/src/types'

export default function TabBarComponent(
  props: BottomTabBarProps<BottomTabBarOptions>,
): ReactElement {
  const { navigation, state, descriptors, activeTintColor, inactiveTintColor } = props
  const routesLength: number = state.routes.length
  const tabWidth: number = Dimensions.get('screen').width / routesLength
  const activeRoute: number = state.index

  return (
    <Container style={styles.container} horizontal safeAreaBottom>
      {state.routes.map((route, routeIndex) => {
        const focused: boolean = activeRoute === routeIndex
        const tintColor: string = (focused ? activeTintColor : inactiveTintColor) ?? '#000'
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
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND,
  },
})
