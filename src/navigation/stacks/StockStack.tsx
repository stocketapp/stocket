import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
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

const { Screen, Navigator } = createStackNavigator<StockStackParamList>()

export default function StockStack() {
  return (
    <Navigator
      headerMode="none"
      mode="modal"
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
        cardOverlayEnabled: true,
      }}
    >
      <Screen name="Stock" component={Stock} />
      <Screen name="TradeStack" component={TradeStack} />
    </Navigator>
  )
}
