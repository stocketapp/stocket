import React from 'react'
import { GRAY_DARKER } from 'utils/colors'
import Text from './Text'
import Container from './Container'

const Balance = () => (
  <Container>
    <Text color={GRAY_DARKER} type="subtitle">
      Balance
    </Text>
    <Text type="heading">$2,084.86</Text>
  </Container>
)

export default Balance
