// @flow
import React from 'react'
import { GRAY_DARKER, GREEN } from 'utils/colors'
import { useSelector } from 'react-redux'
import { formatCurrency } from 'utils/functions'
import Text from './Text'
import Container from './Container'

const Balance = (): React$Node => {
  const { userInfo } = useSelector(({ user }) => user)
  return (
    <Container ph>
      <Text color={GRAY_DARKER} type="label">
        Invested
      </Text>
      <Text type="heading" style={{ fontWeight: '900' }}>
        {formatCurrency(userInfo?.combinedValue || 0)}
      </Text>
      <Text color={GREEN} style={{ fontWeight: '600' }}>
        34.6
      </Text>
    </Container>
  )
}

export default Balance
