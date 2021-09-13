import { Text } from '@components'
import { AddCashButtonContainer } from './styles'

export default function AddCashButton({ onPress }: { onPress: () => void }) {
  return (
    <AddCashButtonContainer onPress={onPress}>
      <Text color="TEXT_DARK" weight="Black" style={{ fontSize: 12 }}>
        ADD MORE
      </Text>
    </AddCashButtonContainer>
  )
}
