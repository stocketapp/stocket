import { TradeButtonsContainer, TradeButton } from './styles'
import { Text } from '@components'
import { GREEN, RED } from '@utils/colors'

const StockTradeButtons = ({ onPress }: StockTradeButtonsProps) => (
  <TradeButtonsContainer>
    <TradeButton style={{ backgroundColor: GREEN }} onPress={onPress}>
      <Text type="title" weight="Bold">
        Buy
      </Text>
    </TradeButton>
    <TradeButton style={{ backgroundColor: RED }} onPress={onPress}>
      <Text type="title" weight="Bold">
        Sell
      </Text>
    </TradeButton>
  </TradeButtonsContainer>
)

interface StockTradeButtonsProps {
  onPress?: () => void
}

export default StockTradeButtons
