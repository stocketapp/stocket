import { GREEN, RED } from '@utils/colors'
import Text from '../Text'
import { formatCurrency } from '@utils/functions'
import { PortfolioQueryType } from 'views/Home/hooks/useHomeHook'
import { ChangeContainer, BalanceContaienr, valueStyle } from './styles'

const Balance = ({ value, change, changePct }: PortfolioQueryType): JSX.Element => {
  const color = changePct > 0 ? GREEN : changePct < 0 ? RED : 'white'
  const upOrDown = changePct > 0 ? 'up' : 'down'
  const formattedChange = (change ?? 0).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
  const day = new Date().getDay()
  const isWeekend = day === 6 ? 'yesterday' : day === 0 ? 'on Friday' : 'today'
  const is = day === 6 || day === 0 ? 'was' : 'is'

  return (
    <BalanceContaienr>
      <Text weight="Black" style={valueStyle}>
        {formatCurrency(value)}{' '}
      </Text>
      <ChangeContainer>
        <Text weight="Medium" type="label">
          Your portfolio {is} {upOrDown}{' '}
          <Text weight="Bold" color={color} type="label">
            {(changePct ?? 0)?.toFixed(2)}%{' '}
          </Text>
          {isWeekend},
        </Text>
        <Text color={color} weight="Bold" type="label">
          <Text weight="Medium" type="label">
            it gained{' '}
          </Text>
          {formattedChange}{' '}
          <Text weight="Medium" type="label">
            in total value.
          </Text>
        </Text>
      </ChangeContainer>
    </BalanceContaienr>
  )
}

export default Balance
