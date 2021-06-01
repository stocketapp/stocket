import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { Stock } from '@views'
import { CompanyParams } from 'navigation/AppStack'
import TradeStack from './TradeStack'

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
