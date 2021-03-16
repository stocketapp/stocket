import React from 'react'
import {} from 'react-native'
import { Container, Text } from '@components'
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'
import { SUB_BACKGROUND, GRAY_DARKER } from '@utils/colors'

export const StockHeaderLoader = () => (
  <Container fullView safeAreaTop ph>
    <Text>Hello</Text>
    <ContentLoader
      viewBox="80 10 380 700"
      speed={1}
      animate
      backgroundColor={SUB_BACKGROUND}
      foregroundColor={GRAY_DARKER}
    >
      <Circle cx="30" cy="30" r="30" />
      <Rect x="80" y="17" rx="4" ry="4" width="200" height="30" />
      <Rect x="80" y="60" rx="3" ry="3" width="100" height="20" />
    </ContentLoader>
  </Container>
)
