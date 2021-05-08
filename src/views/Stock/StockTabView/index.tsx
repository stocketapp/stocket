import { useState } from 'react'
import { View, useWindowDimensions } from 'react-native'
import {
  TabView,
  SceneMap,
  TabBar,
  SceneRendererProps,
  NavigationState,
} from 'react-native-tab-view'
import { BACKGROUND, GREEN } from '@utils/colors'
import StockTradeTab from './StockTradeTab'

const SecondRoute = () => <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
const ThirdRoute = () => <View style={{ flex: 1, backgroundColor: '#486ab1' }} />

const renderCustomTab = (
  props: SceneRendererProps & {
    navigationState: NavigationState<{
      key: string
      title: string
    }>
  },
) => (
  <TabBar
    {...props}
    style={{ backgroundColor: BACKGROUND }}
    indicatorStyle={{ backgroundColor: GREEN, borderRadius: 50 }}
    getLabelText={({ route }) => route.title}
    labelStyle={{ textTransform: 'capitalize' }}
  />
)

export default function StockTabView({ routeParams }: StockTabViewProps) {
  const layout = useWindowDimensions()

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'trade', title: 'Trade' },
    { key: 'overview', title: 'Overview' },
    { key: 'third', title: 'Third' },
  ])

  const renderScene = SceneMap({
    trade: () => <StockTradeTab routeParams={routeParams} activeTab={index} />,
    overview: SecondRoute,
    third: ThirdRoute,
  })

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderCustomTab}
    />
  )
}

interface StockTabViewProps {
  routeParams: any
}
