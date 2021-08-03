import { useState, useCallback, useEffect, useMemo } from 'react'
import { useWindowDimensions } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import { TradeTab, NewsTab, PositionTab, OverviewTab } from '../Tabs'
import { useQuery } from '@apollo/client'
import { RouteProp, useRoute, useFocusEffect } from '@react-navigation/native'
import { StockStackParamsList } from 'navigation/stacks/StockStack'
import { portfolioValueVar } from '@cache'
import { useReactiveVar } from '@apollo/client'
import { isEmpty } from 'lodash'
import useStockHook from '../hooks/useStockHook'
import StockTabBar from './StockTabBar'
import { GET_POSITION } from '../queries'

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
  const quoteData = useStockHook(params?.symbol, index)

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
    trade: () => <TradeTab activeTab={index} position={position} data={quoteData} />,
    position: () => <PositionTab activeTab={index} position={position} />,
    overview: () => <OverviewTab symbol={params?.symbol} />,
    news: () => <NewsTab activeTab={index} symbol={params?.symbol} />,
  }
  const renderScene = SceneMap(sceneMap)

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={StockTabBar}
      lazy
      sceneContainerStyle={{ paddingTop: 16 }}
    />
  )
}
