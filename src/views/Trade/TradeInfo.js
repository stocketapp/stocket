// @flow
import React from 'react'
import { View } from 'react-native'
import { Container, Text } from 'stocket-components'
import type { TradeInfoProps } from 'ComponentsTypes'

export default function TradeInfo({ data, loading }: TradeInfoProps) {
  return (
    <Container noPh>
      {data && (
        <Container horizontal separate>
          <View>
            <Text type="title">{data?.symbol}</Text>
            <Text>{data?.name}</Text>
          </View>
          <View>
            <Text type="title">${data?.price}</Text>
          </View>
        </Container>
      )}
    </Container>
  )
}
