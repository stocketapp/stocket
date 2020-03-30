// @flow
import React from 'react'
import { TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import { Container } from 'components'

type TabBarProps = {
  state: { routes: any, index: number },
  descriptors: [],
  activeTintColor: string,
  inactiveTintColor: string,
  navigation: {
    navigate: (route: string) => void,
    state: { routes: Array<any>, index: number },
  },
}

export default function TabBarComponent(props: TabBarProps): React$Node {
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
    <Container style={styles.container} horizontal>
      {state.routes.map((route, routeIndex) => {
        const focused: boolean = activeRoute === routeIndex
        const tintColor: string = focused ? activeTintColor : inactiveTintColor
        const { options } = descriptors[route.key]
        const { tabBarIcon } = options

        return (
          <TouchableOpacity
            onPress={() => navigation.navigate(route.name)}
            key={route.key}
            style={{
              width: tabWidth,
              alignItems: 'center',
              paddingVertical: 10,
            }}
          >
            {tabBarIcon({ color: tintColor })}
          </TouchableOpacity>
        )
      })}
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    shadowOffset: { height: -4, width: 0 },
    shadowRadius: 3,
    shadowOpacity: 0.3,
  },
})
