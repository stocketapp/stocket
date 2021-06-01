import { createStackNavigator } from '@react-navigation/stack'
import StockTradeModal from '../../views/Trade'
import TradeModalReview from '../../views/TradeReview'

export type TradeStackParamList = {
  TradeModal: {
    companyName: string
    symbol: string
    logo: string
    price: number
  }
  TradeModalReview: undefined
}

const { Screen, Navigator } = createStackNavigator<TradeStackParamList>()

export default function TradeStack() {
  return (
    <Navigator headerMode="none" mode="modal">
      <Screen name="TradeModal" component={StockTradeModal} />
      <Screen name="TradeModalReview" component={TradeModalReview} />
    </Navigator>
  )
}
