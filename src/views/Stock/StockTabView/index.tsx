import { useState, useCallback } from 'react'
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
import { useQuery } from '@apollo/client'
import { RouteProp, useRoute, useFocusEffect } from '@react-navigation/native'
import { StockStackParamsList } from 'navigation/stacks/StockStack'
import { GET_POSITION } from '../queries'

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
  const { params } = useRoute<RouteProp<StockStackParamsList, 'Stock'>>()
  const { data, refetch } = useQuery(GET_POSITION, {
    variables: { symbol: params?.symbol },
  })
  const position = data?.position

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'trade', title: 'Trade' },
    { key: 'position', title: 'Position' },
    { key: 'overview', title: 'Overview' },
    { key: 'news', title: 'News' },
  ])

  useFocusEffect(
    useCallback(() => {
      refetch()
    }, [refetch]),
  )

  const renderScene = SceneMap({
    trade: () => <StockTradeTab activeTab={index} position={position} />,
    position: () => <StockPositionTab activeTab={index} position={position} />,
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
