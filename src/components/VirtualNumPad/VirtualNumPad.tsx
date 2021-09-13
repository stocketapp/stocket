import { GestureResponderEvent, View } from 'react-native'
import { useState, useEffect } from 'react'
import Text from '../Text'
import { PadBtn, Row } from './styles'
import DeleteSVG from '@svg/delete.svg'
import theme from '@theme'

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
        <DeleteSVG stroke={theme.colors.GREEN} height={34} width={34} />
      )}
    </PadBtn>
  )
}

export interface VirtualNumPadProps {
  onKeyPress: (value: string) => void
}
const VirtualNumPad = ({ onKeyPress }: VirtualNumPadProps) => {
  const [value, setValue] = useState('0')

  useEffect(() => {
    value === '' && setValue('0')

    onKeyPress(value)
  }, [value, onKeyPress])

  const numPadRemove = () => {
    setValue(() => value.slice(0, -1))
  }

  const press = (str: string) => {
    if (value === '' && str === '.') {
      setValue('0.')
    } else {
      setValue(state => state.concat(str).replace(/^0/g, ''))
    }
  }

  return (
    <View>
      {pad.map((row, i) => (
        <Row key={i}>
          {row.map(num => (
            <PadButton
              value={num}
              key={num}
              onPress={() => press(num)}
              onDelete={numPadRemove}
            />
          ))}
        </Row>
      ))}
    </View>
  )
}

const pad = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['.', '0', 'delete'],
]

export default VirtualNumPad
