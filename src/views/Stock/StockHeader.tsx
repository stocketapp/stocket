import { Container, Text } from '@components'
import { useTheme } from '@emotion/react'
import { formatCurrency } from '@utils/functions'
import { IEXQuote } from 'types'
import { LogoImage } from './styles'

const StockHeader = (props: IEXQuote) => {
  const { colors, p } = useTheme()
  const { logo, symbol, change, latestPrice, changePercent, companyName } = props
  const isPositive = change > 0
  const color = isPositive ? colors?.GREEN : change < 0 ? colors?.RED : 'white'

  return (
    <Container>
      <Container horizontal alignItems="center">
        <LogoImage source={{ uri: logo }} />
        <Container>
          <Text type="heading" weight="Black" pl={p.lg}>
            {companyName}
          </Text>
          <Text type="title" weight="Medium" pl={p.lg} color={colors.GRAY}>
            {symbol}
          </Text>
        </Container>
      </Container>
      <Text type="big" weight="Black" pt={p.xlg}>
        {formatCurrency(Number(latestPrice?.toFixed(2)))}
      </Text>
      <Container horizontal top={p.sm}>
        <Text type="title" weight="Heavy" color={color}>
          {change > 0 && '+'}
          {change?.toFixed(2)}{' '}
        </Text>
        <Text type="label" weight="Medium" color={colors.GRAY}>
          ({change > 0 && '+'}
          {changePercent?.toFixed(2)}%)
        </Text>
      </Container>
    </Container>
  )
}

export default StockHeader
