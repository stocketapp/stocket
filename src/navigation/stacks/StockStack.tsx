import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Stock } from '@views'
import TradeStack from './TradeStack'

type CompanyParams = {
  companyName: string
  symbol: string
  logo: string
}

export type StockStackParamList = {
  TradeStack: CompanyParams
  Stock: CompanyParams
}

const { Screen, Navigator, Group } = createNativeStackNavigator<StockStackParamList>()

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
