import { View, useWindowDimensions } from 'react-native'
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/core'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StockStackParamsList } from 'navigation/stacks/StockStack'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { isEmpty } from 'lodash'
import {
  SceneMap,
  TabView,
  SceneRendererProps,
  NavigationState,
  TabBar,
} from 'react-native-tab-view'
import { useQuery } from '@apollo/client'
import { useReactiveVar } from '@apollo/client'
import { portfolioValueVar } from '@cache'
import { PositionType } from 'types'
import StockNavHeader from './StockNavHeader'
import useStockHook from './hooks/useStockHook'
import { TradeTab, NewsTab, OverviewTab } from './Tabs'
import { GET_POSITION } from './queries'
import theme from '../../theme'

export default function Stock() {
  const layout = useWindowDimensions()
  const { top: insetTop } = useSafeAreaInsets()
  const [index, setIndex] = useState(0)
  const { params } = useRoute<RouteProp<StockStackParamsList, 'Stock'>>()
  const { data, refetch } = useQuery(GET_POSITION, {
    variables: { symbol: params?.symbol },
  })
  const position = data?.position
  const portfolio = useReactiveVar(portfolioValueVar)
  const cachedPosition = useMemo(
    () =>
      portfolio?.positions?.filter((el: PositionType) => el.symbol === params?.symbol),
    [params?.symbol, portfolio?.positions],
  )
  const quoteData = useStockHook(params?.symbol, index)
  const [routes, setRoutes] = useState([
    { key: 'trade', title: 'Trade' },
    { key: 'overview', title: 'Overview' },
    { key: 'news', title: 'News' },
  ])
  const renderScene = SceneMap({
    trade: () => <TradeTab activeTab={index} position={position} data={quoteData} />,
    overview: () => <OverviewTab symbol={params?.symbol} position={position} />,
    news: () => <NewsTab activeTab={index} symbol={params?.symbol} />,
  })

  useEffect(() => {
    if (isEmpty(cachedPosition)) {
      setRoutes(r => r.filter(el => el.key !== 'position'))
    }
  }, [params?.symbol, cachedPosition])

  useFocusEffect(
    useCallback(() => {
      if (index === 1) {
        const refetchInterval = setInterval(async () => await refetch(), 15000)
        return () => clearInterval(refetchInterval)
      }
    }, [index, refetch]),
  )

  return (
    <View
      style={{ flex: 1, paddingTop: insetTop, backgroundColor: theme.colors.BG_DARK }}
    >
      <StockNavHeader symbol={params?.symbol} companyName={params?.companyName} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={CustomTabBar}
        lazy
        sceneContainerStyle={{ paddingTop: 16 }}
        swipeEnabled={false}
      />
    </View>
  )
}

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
    style={{ backgroundColor: theme.colors.BACKGROUND }}
    indicatorStyle={{ backgroundColor: theme.colors.GREEN, borderRadius: 50 }}
    getLabelText={({ route }) => route.title}
    labelStyle={{ textTransform: 'capitalize' }}
  />
)
