import { Text, VirtualNumPad } from '@components'
import { VirtualNumPadProps } from 'components/VirtualNumPad/VirtualNumPad'
import { TradeModalKeyboardContainer, ButtonTrade } from './styles'
import theme from '@theme'

const TradeModalKeyboard = ({
  onKeyPress,
  orderType,
  onBtnPress,
}: TradeModalKeyboardProps) => (
  <TradeModalKeyboardContainer>
    <VirtualNumPad onKeyPress={onKeyPress} />
    <ButtonTrade
      style={{ backgroundColor: theme.colors.GREEN }}
      onPress={() => onBtnPress(orderType)}
    >
      <Text type="heading" weight="Bold">
        {orderType}
      </Text>
    </ButtonTrade>
  </TradeModalKeyboardContainer>
)

interface TradeModalKeyboardProps extends VirtualNumPadProps {
  orderType: 'BUY' | 'SELL'
  onBtnPress: (orderType: 'BUY' | 'SELL') => void
}

export default TradeModalKeyboard
