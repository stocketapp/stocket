import { IEXQuote } from 'types'
import { Container, Text } from '@components'
import { useTheme } from '@emotion/react'
// @ts-ignore
import { ChartYLabel } from '@rainbow-me/animated-charts'
import { chartLabel } from './styles'

function formatUSD(number: number) {
  return Number(number).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

export default function ChartPrice(props: IEXQuote) {
  const { latestPrice, changePercent, change } = props
  const { colors, p } = useTheme()
  const isPositive = change > 0
  const color = isPositive ? colors?.GREEN : change < 0 ? colors?.RED : 'white'

  const formatUsd = (value: any) => {
    'worklet'
    return formatUSD(value)
  }

  return (
    <>
      <Container>
        <ChartYLabel style={[chartLabel]} format={formatUsd} />

        <Container horizontal top={p.sm}>
          {/* <Text type="label" weight="Bold" color={color}>
            {change > 0 && '+'}
            {change?.toFixed(2)}{' '}
          </Text> */}
          <Text type="label" weight="Bold" color={color}>
            {/* {change > 0 && '+'} */}
            {changePercent?.toFixed(2)}%
          </Text>
        </Container>
      </Container>
    </>
  )
}
