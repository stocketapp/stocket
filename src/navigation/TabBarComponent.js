// @flow
import React from 'react'
import { TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import { Container } from 'components'
import { GRAY_DARKER } from 'utils/colors'

type TabBarProps = {
  renderIcon: ({
    route: {},
    tintColor: string,
    focused: boolean,
  }) => React$Node,
  navigation: {
    navigate: (route: string) => void,
    state: { routes: Array<any>, index: number },
  },
}

export default function TabBarComponent(props: TabBarProps): React$Node {
  const { renderIcon, navigation } = props
  const routes: Array<any> = navigation.state?.routes
  const routesLength: number = routes.length
  const tabWidth: number = Dimensions.get('screen').width / routesLength
  const activeRoute: number = navigation.state?.index

  return (
    <Container style={styles.container} horizontal>
      {routes.map((route, routeIndex) => {
        const focused: boolean = activeRoute === routeIndex
        const tintColor: string = focused ? '#fff' : GRAY_DARKER

        return (
          <TouchableOpacity
            onPress={() => navigation.navigate(route.key)}
            key={route.key}
            style={{
              width: tabWidth,
              alignItems: 'center',
              paddingVertical: 10,
            }}
          >
            {renderIcon({ route, tintColor, focused })}
          </TouchableOpacity>
        )
      })}
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#242424',
    paddingBottom: 20,
    shadowColor: '#101010',
    shadowOffset: { height: -4, width: 0 },
    shadowRadius: 3,
    shadowOpacity: 0.3,
  },
})
