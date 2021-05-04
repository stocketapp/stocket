import { View, useWindowDimensions } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import { useState } from 'react'
import StockTradeTab from './StockTradeTab'

const SecondRoute = () => <View style={{ flex: 1, backgroundColor: '#673ab7' }} />

export default function StockTabView({ routeParams }: StockTabViewProps) {
  const layout = useWindowDimensions()

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'trade', title: 'Trade' },
    { key: 'overview', title: 'Overview' },
  ])

  const renderScene = SceneMap({
    trade: () => <StockTradeTab routeParams={routeParams} activeTab={index} />,
    overview: SecondRoute,
  })
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  )
}

interface StockTabViewProps {
  routeParams: any
}
