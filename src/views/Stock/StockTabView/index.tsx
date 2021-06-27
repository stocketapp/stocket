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
import StockPositionTab from '../StockPositionTab'

const Overview = () => <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
const News = () => <View style={{ flex: 1, backgroundColor: '#486ab1' }} />

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

export default function StockTabView() {
  const layout = useWindowDimensions()

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'trade', title: 'Trade' },
    { key: 'position', title: 'Position' },
    { key: 'overview', title: 'Overview' },
    { key: 'news', title: 'News' },
  ])

  const renderScene = SceneMap({
    trade: () => <StockTradeTab activeTab={index} />,
    position: () => <StockPositionTab activeTab={index} />,
    overview: Overview,
    news: News,
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
