import React from 'react'
import { GREEN, RED } from '@utils/colors'
import Text from '../Text'
import { formatCurrency } from '@utils/functions'
import { PortfolioQueryType } from 'views/Home/hooks/useHomeHook'
import { ChangeContainer, BalanceContaienr, valueStyle } from './styles'

const Balance = ({ value, change, changePct }: PortfolioQueryType): JSX.Element => {
  const color = changePct > 0 ? GREEN : changePct < 0 ? RED : 'white'
  const upOrDown = changePct > 0 ? 'up' : 'down'
  const formattedChange = change?.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return (
    <BalanceContaienr>
      <Text weight="Black" style={valueStyle}>
        {formatCurrency(value)}{' '}
      </Text>
      <ChangeContainer>
        <Text weight="Medium" type="label">
          Your portfolio is {upOrDown}{' '}
          <Text weight="Bold" color={color} type="label">
            {(changePct ?? 0)?.toFixed(2)}%{' '}
          </Text>
          today,
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
