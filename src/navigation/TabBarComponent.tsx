import React, { ReactElement } from 'react'
import { TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import { Container } from 'components'
import { BACKGROUND } from 'utils/colors'
import { NavigationHelpers, ParamListBase } from '@react-navigation/native'
import { BottomTabDescriptorMap } from '@react-navigation/bottom-tabs/lib/typescript/src/types'

export default function TabBarComponent(props: TabBarProps): ReactElement {
  const {
    navigation,
    state,
    descriptors,
    activeTintColor,
    inactiveTintColor,
  } = props
  const routesLength: number = state.routes.length
  const tabWidth: number = Dimensions.get('screen').width / routesLength
  const activeRoute: number = state.index

  return (
    <Container style={styles.container} horizontal safeAreaBottom>
      {state.routes.map((route: TabBarRoute, routeIndex: number) => {
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
    </Container>
  )
}

interface TabBarProps {
  state: { routes: any; index: number }
  descriptors: BottomTabDescriptorMap
  activeTintColor?: string
  inactiveTintColor?: string
  navigation: NavigationHelpers<ParamListBase>
}

interface TabBarRoute {
  key: number
  name: string
  options: {
    tabBarIcon: (args: { color?: string }) => ReactElement
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND,
  },
})
