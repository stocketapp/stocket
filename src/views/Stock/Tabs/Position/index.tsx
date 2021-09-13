import { Container } from '@components'
import { PositionType } from 'types'
import { formatCurrency } from '@utils/functions'
import PositionDetail from './PositionDetail'

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
