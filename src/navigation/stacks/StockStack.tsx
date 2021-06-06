import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import { Stock } from '@views'
import TradeStack, { TradeStackParamList } from './TradeStack'
import { NavigatorScreenParams } from '@react-navigation/native'

export type CompanyParams = {
  companyName: string
  symbol: string
  logo: string
}

export type StockStackParamsList = {
  TradeStack: NavigatorScreenParams<TradeStackParamList>
  Stock: CompanyParams
}

export type StockNavigationProps = NativeStackNavigationProp<StockStackParamsList>

const { Screen, Navigator, Group } = createNativeStackNavigator<StockStackParamsList>()

export default function StockStack() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Stock" component={Stock} />
      <Group screenOptions={{ presentation: 'modal' }}>
        <Screen name="TradeStack" component={TradeStack} />
      </Group>
    </Navigator>
  )
}
