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

const Overview = () => <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
const News = () => <View style={{ flex: 1, backgroundColor: '#486ab1' }} />
const Position = () => <View style={{ flex: 1, backgroundColor: '#2f2af1' }} />

const CustomTabBar = (
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
    { key: 'news', title: 'News' },
    { key: 'position', title: 'Position' },
  ])

  const renderScene = SceneMap({
    trade: () => <StockTradeTab routeParams={routeParams} activeTab={index} />,
    overview: Overview,
    news: News,
    position: Position,
  })

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={CustomTabBar}
    />
  )
}

interface StockTabViewProps {
  routeParams: any
}
