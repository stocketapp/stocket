import Text from '../Text'
import { formatCurrency } from '@utils/functions'
import { PortfolioQueryType } from 'views/Home/hooks/useHomeHook'
import { ChangeContainer, BalanceContaienr, valueStyle } from './styles'
import { ArrowUpIcon, ArrowDownIcon } from '@icons'

const Balance = ({ value, change, changePct }: PortfolioQueryType): JSX.Element => {
  const isPositive = changePct > 0
  const color = isPositive ? 'GREEN' : changePct < 0 ? 'RED' : 'WHITE'
  const Arrow = isPositive ? ArrowUpIcon : ArrowDownIcon
  const formattedChange = (change ?? 0).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return (
    <BalanceContaienr>
      <Text weight="Black" style={valueStyle}>
        {formatCurrency(value)}{' '}
      </Text>
      <ChangeContainer>
        <Arrow size={20} color={color.toLocaleLowerCase()} />
        <Text weight="Medium" type="label" color="GRAY">
          <Text weight="Bold" color={color} type="label">
            {formattedChange} ({(changePct ?? 0)?.toFixed(2)}% )
          </Text>
        </Text>
      </ChangeContainer>
    </BalanceContaienr>
  )
}

export default Balance
