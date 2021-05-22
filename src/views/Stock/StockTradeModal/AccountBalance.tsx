import { Text } from '@components'
import { formatCurrency } from '@utils/functions'
import { CustomTheme } from 'theme'

const TradeAccountBalance = ({ balance, theme }: TradeAccountBalanceProps) => (
  <>
    <Text type="title" color="GRAY">
      Account Balance
    </Text>
    <Text type="heading" weight="Bold" style={{ paddingTop: theme.p.md }}>
      {formatCurrency(balance)}
    </Text>
  </>
)

interface TradeAccountBalanceProps {
  balance: number
  theme: CustomTheme
}

export default TradeAccountBalance
