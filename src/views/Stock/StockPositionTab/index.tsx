import { Container, Text } from '@components'
import { PositionType } from 'types'
import { PositionDetailContainer } from './styles'
import { formatCurrency } from '@utils/functions'

const PositionDetail = ({ label, value }: DetailProps) => (
  <PositionDetailContainer>
    <Text type="label" weight="Medium" color="GRAY">
      {label}
    </Text>
    <Text type="heading" weight="Heavy">
      {value}
    </Text>
  </PositionDetailContainer>
)

interface DetailProps {
  label: string
  value: string | number
}

export default function StockPositionTab({ position }: StockPositionTabProps) {
  return (
    <Container fullView ph items="center">
      <Container content="center" horizontal>
        <PositionDetail label="Shares" value={position?.size} />
        <PositionDetail label="Total" value={formatCurrency(position?.totalValue)} />
      </Container>
      <Container content="center" horizontal>
        <PositionDetail label="Change" value={formatCurrency(position?.change24h)} />
        <PositionDetail label="Change %" value={position?.change24hPct} />
      </Container>
    </Container>
  )
}

interface StockPositionTabProps {
  activeTab: number
  position: PositionType
}
