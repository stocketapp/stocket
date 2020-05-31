import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Text } from 'components'
import { GREEN, DARK_TEXT } from 'utils/colors'

export default function () {
  return (
    <TouchableOpacity style={{ top: 2 }}>
      <View style={styles.button}>
        <Text color={DARK_TEXT} weight="Black" style={{ fontSize: 11 }}>
          ADD MORE
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = {
  button: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 1000,
    backgroundColor: GREEN,
  },
}
