import { VirtualNumPad, Button } from '@components'
import { VirtualNumPadProps } from 'components/VirtualNumPad/VirtualNumPad'
import { TradeModalKeyboardContainer } from './styles'

const TradeModalKeyboard = ({
  onKeyPress,
  orderType,
  onBtnPress,
  btnDisabled,
}: TradeModalKeyboardProps) => (
  <TradeModalKeyboardContainer>
    <VirtualNumPad onKeyPress={onKeyPress} />
    <Button label="Review" onPress={() => onBtnPress(orderType)} disabled={btnDisabled} />
  </TradeModalKeyboardContainer>
)

interface TradeModalKeyboardProps extends VirtualNumPadProps {
  orderType: 'BUY' | 'SELL'
  onBtnPress: (orderType: 'BUY' | 'SELL') => void
  btnDisabled: boolean
}

export default TradeModalKeyboard
