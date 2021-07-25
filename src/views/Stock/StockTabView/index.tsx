import { useState, useCallback, useEffect, useMemo } from 'react'
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
import { portfolioValueVar } from '@cache'
import { useReactiveVar } from '@apollo/client'
import { isEmpty } from 'lodash'

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
  const [routes, setRoutes] = useState([
    { key: 'trade', title: 'Trade' },
    { key: 'position', title: 'Position' },
    { key: 'overview', title: 'Overview' },
    { key: 'news', title: 'News' },
  ])
  const { params } = useRoute<RouteProp<StockStackParamsList, 'Stock'>>()
  const { data: positionData, refetch } = useQuery(GET_POSITION, {
    variables: { symbol: params?.symbol },
  })
  const position = positionData?.position
  const portfolio = useReactiveVar(portfolioValueVar)
  const cachedPosition = useMemo(
    () => portfolio?.positions?.filter(el => el.symbol === params?.symbol),
    [params?.symbol, portfolio?.positions],
  )

  useEffect(() => {
    if (isEmpty(cachedPosition)) {
      setRoutes(r => r.filter(el => el.key !== 'position'))
    }
  }, [params?.symbol, cachedPosition])

  useFocusEffect(
    useCallback(() => {
      if (index === 1) {
        const refetchInterval = setInterval(async () => {
          await refetch()
        }, 15000)
        return () => clearInterval(refetchInterval)
      }
    }, [index, refetch]),
  )

  const sceneMap = {
    trade: () => <StockTradeTab activeTab={index} position={position} />,
    position: () => <StockPositionTab activeTab={index} position={position} />,
    overview: Overview,
    news: News,
  }
  const renderScene = SceneMap(sceneMap)

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={CustomTabBar}
      lazy
    />
  )
}
