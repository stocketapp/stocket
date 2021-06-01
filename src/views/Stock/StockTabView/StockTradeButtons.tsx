import { TradeButtonsContainer, TradeButton } from './styles'
import { Text } from '@components'
import { GREEN, RED } from '@utils/colors'

const StockTradeButtons = ({ onPress }: StockTradeButtonsProps) => (
  <TradeButtonsContainer>
    <TradeButton style={{ backgroundColor: GREEN }} onPress={() => onPress('BUY')}>
      <Text type="title" weight="Bold">
        Buy
      </Text>
    </TradeButton>
    <TradeButton style={{ backgroundColor: RED }} onPress={() => onPress('SELL')}>
      <Text type="title" weight="Bold">
        Sell
      </Text>
    </TradeButton>
  </TradeButtonsContainer>
)

interface StockTradeButtonsProps {
  onPress: (orderType: 'BUY' | 'SELL') => void
}

export default StockTradeButtons
