// @flow
import React from 'react'
import { GRAY_DARKER } from 'utils/colors'
import { useSelector } from 'react-redux'
import { formatCurrency } from 'utils/functions'
import Text from './Text'
import Container from './Container'

const Balance = (): React$Node => {
  const { userInfo } = useSelector(({ user }) => user)
  return (
    <Container ph>
      <Text color={GRAY_DARKER} type="label">
        Balance
      </Text>
      <Text type="heading">{formatCurrency(userInfo?.combinedValue)}</Text>
    </Container>
  )
}

export default Balance
