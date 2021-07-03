import { Text } from '@components'
import { formatCurrency } from '@utils/functions'
import {
  TradeAccountBalanceContainer,
  TradeAccountBalanceInner,
  TradeAccountBalanceLabels,
} from './styles'

const TradeAccountBalance = ({
  balance,
  maxShares,
  isOrderTypeSell,
}: TradeAccountBalanceProps) => (
  <TradeAccountBalanceContainer>
    <TradeAccountBalanceInner>
      <TradeAccountBalanceLabels>
        <Text type="label" weight="Semibold" color="GRAY">
          {isOrderTypeSell ? 'Position Total' : 'Available Cash'}
        </Text>
        <Text type="subtext" color="GRAY">
          {isOrderTypeSell ? `${maxShares} shares owned` : `Max ${maxShares} shares`}
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
  maxShares: string | number | undefined
  isOrderTypeSell: boolean
}

export default TradeAccountBalance
