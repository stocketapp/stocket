import { Image } from 'react-native'
import { Container, Text } from '@components'
import { useTheme } from '@emotion/react'
import { formatCurrency } from '@utils/functions'
import { IEXQuote } from 'types'

const StockHeader = (props: IEXQuote) => {
  const { colors, p } = useTheme()
  const { logo, symbol, change, latestPrice, changePercent } = props
  const isPositive = change > 0
  const color = isPositive ? colors?.GREEN : change < 0 ? colors?.RED : 'white'

  return (
    <Container top={p.lg}>
      <Container horizontal alignItems="flex-end" justifyContent="flex-start">
        <Image source={{ uri: logo }} style={{ width: 42, height: 42, borderRadius: 50 }} />
        <Text type="big" weight="Black" pl={p.md} pt={2.5}>
          {symbol}
        </Text>
      </Container>
      <Container top={p.lg}>
        <Text type="big" weight="Black">
          {formatCurrency(Number(latestPrice?.toFixed(2)))}
        </Text>
      </Container>
      <Container horizontal>
        <Text type="title" weight="Heavy" color={color}>
          {change?.toFixed(2)}{' '}
        </Text>
        <Text type="label" weight="Semibold" color={colors.GRAY}>
          ({changePercent?.toFixed(2)}%)
        </Text>
      </Container>
    </Container>
  )
}

export default StockHeader
