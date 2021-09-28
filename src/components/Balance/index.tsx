import Text from '../Text'
import { formatCurrency } from '@utils/functions'
import { ChangeContainer, BalanceContaienr, valueStyle } from './styles'
import { ArrowUpIcon, ArrowDownIcon } from '@icons'

const Balance = ({ value, change, changePct }: BalanceProps) => {
  const isPositive = changePct > 0
  const color = isPositive ? 'GREEN' : changePct < 0 ? 'RED' : 'WHITE'
  const Arrow = isPositive ? ArrowUpIcon : ArrowDownIcon

  return (
    <BalanceContaienr>
      <Text weight="Black" style={valueStyle}>
        {formatCurrency(value)}{' '}
      </Text>
      {changePct !== 0 ? (
        <ChangeContainer>
          <Arrow size={20} color={color.toLocaleLowerCase()} />
          <Text weight="Medium" type="label" color="GRAY">
            <Text weight="Bold" color={color} type="label">
              {formatCurrency(change)} ({(changePct ?? 0)?.toFixed(2)}%)
            </Text>
          </Text>
        </ChangeContainer>
      ) : null}
    </BalanceContaienr>
  )
}

interface BalanceProps {
  value: number
  change: number
  changePct: number
}

export default Balance
