import { VirtualNumPad, Button } from '@components'
import { VirtualNumPadProps } from 'components/VirtualNumPad/VirtualNumPad'
import { TradeModalKeyboardContainer } from './styles'

const TradeModalKeyboard = ({
  onKeyPress,
  orderType,
  onBtnPress,
}: TradeModalKeyboardProps) => (
  <TradeModalKeyboardContainer>
    <VirtualNumPad onKeyPress={onKeyPress} />
    <Button label={orderType} onPress={() => onBtnPress(orderType)} />
  </TradeModalKeyboardContainer>
)

interface TradeModalKeyboardProps extends VirtualNumPadProps {
  orderType: 'BUY' | 'SELL'
  onBtnPress: (orderType: 'BUY' | 'SELL') => void
}

export default TradeModalKeyboard
