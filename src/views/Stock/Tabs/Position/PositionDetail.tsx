import { Text } from '@components'
import { PositionDetailContainer } from './styles'

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

export default PositionDetail
