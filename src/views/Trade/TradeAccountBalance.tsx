import { Text } from '@components'
import { formatCurrency } from '@utils/functions'
import {
  TradeAccountBalanceContainer,
  TradeAccountBalanceInner,
  TradeAccountBalanceLabels,
} from './styles'

const TradeAccountBalance = ({ balance, maxShares }: TradeAccountBalanceProps) => (
  <TradeAccountBalanceContainer>
    <TradeAccountBalanceInner>
      <TradeAccountBalanceLabels>
        <Text type="label" weight="Semibold" color="GRAY">
          Available Cash
        </Text>
        <Text type="subtext" color="GRAY">
          Max {maxShares} shares
        </Text>
      </TradeAccountBalanceLabels>
      <Text type="title" weight="Bold">
        {formatCurrency(balance || 0)}
      </Text>
    </TradeAccountBalanceInner>
  </TradeAccountBalanceContainer>
)

type TradeAccountBalanceProps = {
  balance: number | undefined
  maxShares: string | undefined
}

export default TradeAccountBalance
