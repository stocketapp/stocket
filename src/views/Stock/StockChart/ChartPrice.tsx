import { IEXQuote } from 'types'
import { Container, Text } from '@components'
import { useTheme } from '@emotion/react'
// @ts-ignore
import { ChartYLabel } from '@rainbow-me/animated-charts'
import { chartLabel } from './styles'

export default function ChartPrice(props: IEXQuote) {
  const { latestPrice, changePercentS, change } = props
  const { p } = useTheme()
  const isPositive = change > 0
  const color = isPositive ? 'GREEN' : change < 0 ? 'RED' : 'WHITE'

  const formatUsd = (value: any) => {
    'worklet'
    if (value === '') {
      return Number(latestPrice).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })
    }
    return Number(value).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })
  }

  return (
    <Container>
      <ChartYLabel style={[chartLabel]} format={formatUsd} />

      <Container horizontal top={p.sm}>
        <Text type="label" weight="Bold" color={color}>
          {change > 0 && '+'}
          {change?.toFixed(2)}{' '}
        </Text>
        <Text type="label" weight="Bold" color={color}>
          ({changePercentS})
        </Text>
      </Container>
    </Container>
  )
}
