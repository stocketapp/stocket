import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import TradeModal from '../../views/Trade'
import TradeModalReview from '../../views/TradeReview'

export type TradeStackParamsList = {
  TradeModal: {
    companyName: string
    symbol: string
    logo: string
    ownedShares?: number
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
    logo: string
  }
}

export type TradeStackNavigationProp = NativeStackNavigationProp<TradeStackParamsList>

const { Screen, Navigator } = createNativeStackNavigator<TradeStackParamsList>()

export default function TradeStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="TradeModal" component={TradeModal} />
      <Screen name="TradeModalReview" component={TradeModalReview} />
    </Navigator>
  )
}
