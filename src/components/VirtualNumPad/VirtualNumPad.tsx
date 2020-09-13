import React from 'react'
import { View, TouchableOpacity, GestureResponderEvent } from 'react-native'
import Text from '../Text'
import styles from './styles'

interface PadButtonProps {
  value: string
  onPress: (e: GestureResponderEvent) => void
  onDelete: () => void
}

const PadButton = ({ value, onPress, onDelete }: PadButtonProps) => {
  const isDelete = value === 'delete'
  return (
    <TouchableOpacity onPress={isDelete ? onDelete : onPress}>
      <View style={styles.padBtn}>
        {!isDelete ? (
          <Text style={styles.numText} status="positive">
            {value}
          </Text>
        ) : (
          <Text style={styles.numText} status="positive">
            X
          </Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

interface VirtualNumPad {
  onKeyPress: (number: string) => void
  onDelete: () => void
}
const VirtualNumPad = ({ onKeyPress, onDelete }: VirtualNumPad) => {
  return (
    <View>
      {pad.map((row, i) => (
        <View style={styles.row} key={i}>
          {row.map(num => (
            <PadButton
              value={num}
              key={num}
              onPress={() => onKeyPress(num)}
              onDelete={onDelete}
            />
          ))}
        </View>
      ))}
    </View>
  )
}

const pad = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['  ', '0', 'delete'],
]

export default VirtualNumPad
