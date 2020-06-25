// @flow
import React from 'react'
import { GRAY_DARKER, GREEN } from 'utils/colors'
import Text from './Text'
import Container from './Container'

const Balance = ({ value }: { value: string }): React$Node => {
  return (
    <Container ph>
      <Text color={GRAY_DARKER} type="label">
        Invested
      </Text>
      <Text style={{ fontWeight: '900', fontSize: 34, paddingTop: 10 }}>
        {value || '$0.00'}
      </Text>
      <Text color={GREEN} style={{ fontWeight: '600' }}>
        34.6
      </Text>
    </Container>
  )
}

export default Balance
