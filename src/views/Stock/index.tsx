import React from 'react'
import {} from 'react-native'
import { Container, Text } from '@components'
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'
import { SUB_BACKGROUND, GRAY_DARKER } from '@utils/colors'
import StockContentLoader from './StockContentLoader'

export default function Stock() {
  return (
    <Container fullView safeAreaTop ph>
      <Text>Hello</Text>
      <StockContentLoader />
    </Container>
  )
}
