import { Container, Text } from '@components'
import { PositionType } from 'types'
import { formatCurrency } from '@utils/functions'
import { StatLineContainer } from './styles'

export default function Position({ position }: StockPositionTabProps) {
  return (
    <Container>
      <Text type="title" weight="Black" pb={10}>
        Position
      </Text>

      <PositionDetail label="Shares" value={position?.size} />
      <PositionDetail label="Total" value={formatCurrency(position?.totalValue)} />
      <PositionDetail label="Change" value={position?.change24h} />
      <PositionDetail label="Change %" value={position?.change24hPct} />
    </Container>
  )
}

const PositionDetail = ({ label, value }: DetailProps) => (
  <StatLineContainer>
    <Text type="label" weight="Medium" color="GRAY">
      {label}
    </Text>
    <Text type="label" weight="Heavy">
      {value}
    </Text>
  </StatLineContainer>
)

interface DetailProps {
  label: string
  value: string | number
}

interface StockPositionTabProps {
  position: PositionType
}
