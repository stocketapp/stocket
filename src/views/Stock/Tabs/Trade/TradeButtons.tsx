import { TradeButtonsContainer, TradeButton } from './styles'
import { Text } from '@components'
import theme from '@theme'

const StockTradeButtons = ({ onPress }: StockTradeButtonsProps) => (
  <TradeButtonsContainer>
    <TradeButton
      style={{ backgroundColor: theme.colors.GREEN }}
      onPress={() => onPress('BUY')}
    >
      <Text type="title" weight="Bold">
        Buy
      </Text>
    </TradeButton>
    <TradeButton
      style={{ backgroundColor: theme.colors.RED }}
      onPress={() => onPress('SELL')}
    >
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
