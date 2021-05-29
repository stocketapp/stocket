import { Text, VirtualNumPad } from '@components'
import { VirtualNumPadProps } from 'components/VirtualNumPad/VirtualNumPad'
import { TradeModalKeyboardContainer, ButtonTrade } from './styles'
import theme from '@theme'

const TradeModalKeyboard = ({ onKeyPress }: VirtualNumPadProps) => (
  <TradeModalKeyboardContainer>
    <VirtualNumPad onKeyPress={onKeyPress} />
    <ButtonTrade style={{ backgroundColor: theme.colors.GREEN }}>
      <Text type="heading" weight="Bold">
        Buy
      </Text>
    </ButtonTrade>
  </TradeModalKeyboardContainer>
)

export default TradeModalKeyboard
