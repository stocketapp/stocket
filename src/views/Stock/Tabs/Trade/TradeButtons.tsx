import { TradeButtonsContainer, TradeButton } from './styles'
import { Text } from '@components'
import theme from '@theme'

const StockTradeButtons = ({ onPress, marketHours }: StockTradeButtonsProps) => (
  <TradeButtonsContainer>
    <TradeButton
      style={{ backgroundColor: theme.colors.GREEN, opacity: marketHours ? 1 : 0.6 }}
      onPress={() => onPress('BUY')}
      disabled={!marketHours}
    >
      <Text type="title" weight="Bold">
        Buy
      </Text>
    </TradeButton>
    <TradeButton
      style={{ backgroundColor: theme.colors.RED, opacity: marketHours ? 1 : 0.6 }}
      onPress={() => onPress('SELL')}
      disabled={!marketHours}
    >
      <Text type="title" weight="Bold">
        Sell
      </Text>
    </TradeButton>
  </TradeButtonsContainer>
)

interface StockTradeButtonsProps {
  onPress: (orderType: 'BUY' | 'SELL') => void
  marketHours: boolean
}

export default StockTradeButtons
