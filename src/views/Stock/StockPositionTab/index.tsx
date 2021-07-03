import { Container, Text } from '@components'
import { PositionType } from 'types'

export default function StockPositionTab({ position }: StockPositionTabProps) {
  return (
    <Container fullView>
      <Text>{position?.totalValue}</Text>
    </Container>
  )
}

interface StockPositionTabProps {
  activeTab: number
  position: PositionType
}
