import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import StockTradeModal from '../../views/Trade'
import TradeModalReview from '../../views/TradeReview'

export type TradeStackParamsList = {
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

export type TradeStackNavigationProp = NativeStackNavigationProp<TradeStackParamsList>

const { Screen, Navigator } = createNativeStackNavigator<TradeStackParamsList>()

export default function TradeStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="TradeModal" component={StockTradeModal} />
      <Screen name="TradeModalReview" component={TradeModalReview} />
    </Navigator>
  )
}
