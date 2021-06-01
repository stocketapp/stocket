import { createStackNavigator } from '@react-navigation/stack'
import StockTradeModal from '../../views/Trade'
import TradeModalReview from '../../views/TradeReview'

export type TradeStackParamList = {
  TradeModal: {
    companyName: string
    symbol: string
    logo: string
    price: number
    orderType: 'BUY' | 'SELL'
  }
  TradeModalReview: {
    symbol: string
    total: number
    size: number
    orderType: 'BUY' | 'SELL'
    price: number
    companyName: string
  }
}

const { Screen, Navigator } = createStackNavigator<TradeStackParamList>()

export default function TradeStack() {
  return (
    <Navigator headerMode="none">
      <Screen name="TradeModal" component={StockTradeModal} />
      <Screen name="TradeModalReview" component={TradeModalReview} />
    </Navigator>
  )
}
