// @flow
import React from 'react'
import { View } from 'react-native'
import Container from './Container'
import Text from './Text'
import { GRAY_DARKER } from 'utils/colors'
import type { LabelProps } from 'types'

const styles = {
  flex: 0.5,
}

const Label = ({ title, value, children, style }: LabelProps) => (
  <Container separate style={[styles, style]}>
    <Text type="label" color={GRAY_DARKER}>
      {title}
    </Text>
    <View>{!value ? children : <Text type="label">{value}</Text>}</View>
  </Container>
)

export default Label
