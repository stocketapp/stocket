import { GestureResponderEvent } from 'react-native'
import Text from '../Text'
import { PadBtn, Row } from './styles'

interface PadButtonProps {
  value: string
  onPress: (e: GestureResponderEvent) => void
  onDelete: () => void
}

const PadButton = ({ value, onPress, onDelete }: PadButtonProps) => {
  const isDelete = value === 'delete'
  return (
    <PadBtn onPress={isDelete ? onDelete : onPress}>
      {!isDelete ? (
        <Text type="bigger" color="GREEN" weight="Light">
          {value}
        </Text>
      ) : (
        <Text type="bigger" color="GREEN" weight="Light">
          X
        </Text>
      )}
    </PadBtn>
  )
}

interface VirtualNumPad {
  onKeyPress: (string: string) => void
  onDelete: () => void
}
const VirtualNumPad = ({ onKeyPress, onDelete }: VirtualNumPad) => {
  return (
    <>
      {pad.map((row, i) => (
        <Row key={i}>
          {row.map(num => (
            <PadButton
              value={num}
              key={num}
              onPress={() => onKeyPress(num)}
              onDelete={onDelete}
            />
          ))}
        </Row>
      ))}
    </>
  )
}

const pad = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['.', '0', 'delete'],
]

export default VirtualNumPad
