import { IEXQuote } from 'types'

const StockHeader = (props: IEXQuote) => {
  const { Container, Text } = require('@components')
  const { useTheme } = require('@emotion/react')
  const { formatCurrency } = require('@utils/functions')

  const { colors, p } = useTheme()
  const { change, latestPrice, changePercent } = props
  const isPositive = change > 0
  const color = isPositive ? colors?.GREEN : change < 0 ? colors?.RED : 'white'

  return (
    <Container>
      <Container horizontal alignItems="center">
        <Container>
          <Text type="big" weight="Black" pt={p.xlg}>
            {formatCurrency(Number(latestPrice))}
          </Text>
          <Container horizontal top={p.sm}>
            <Text type="label" weight="Bold" color={color}>
              {change > 0 && '+'}
              {change?.toFixed(2)}{' '}
            </Text>
            <Text type="label" weight="Medium" color={colors.GRAY}>
              ({change > 0 && '+'}
              {changePercent?.toFixed(2)}%)
            </Text>
          </Container>
        </Container>
      </Container>
    </Container>
  )
}

export default StockHeader
