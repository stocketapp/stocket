import { createStackNavigator } from '@react-navigation/stack'
import StockTradeModal from '../../views/Trade'
import TradeModalReview from '../../views/TradeReview'

const { Screen, Navigator } = createStackNavigator()

export default function TradeStack() {
  return (
    <Navigator headerMode="none" mode="modal">
      <Screen name="TradeModal" component={StockTradeModal} />
      <Screen name="TradeModalReview" component={TradeModalReview} />
    </Navigator>
  )
}
