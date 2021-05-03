import { View, useWindowDimensions } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import { useState } from 'react'

const FirstRoute = () => <View style={{ flex: 1, backgroundColor: '#ff4081' }} />

const SecondRoute = () => <View style={{ flex: 1, backgroundColor: '#673ab7' }} />

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
})

export default function StockTabView() {
  const layout = useWindowDimensions()

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ])
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  )
}
