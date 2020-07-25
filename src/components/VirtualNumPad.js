import React from 'react'
import { View, Dimensions, TouchableOpacity } from 'react-native'
import Text from './Text'

const { width } = Dimensions.get('window')

const PadButton = ({ value, onPress, onDelete }) => {
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

const VirtualNumPad = ({ onKeyPress, onDelete }) => {
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

const styles = {
  row: {
    flexDirection: 'row',
  },
  padBtn: {
    width: width / 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '4%',
  },
  numText: {
    fontSize: 24,
    fontWeight: '300',
  },
}

export default VirtualNumPad
