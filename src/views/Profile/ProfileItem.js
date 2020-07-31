import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text } from 'components'
import { LABEL, GRAY_DARKER } from 'utils/colors'

export default function ({ onPress, label, value }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <View style={styles.item}>
        <Text color={LABEL} style={{ fontSize: 16 }} weight="Regular">
          {label}
        </Text>
        <Text type="label" weight="Regular">
          {value}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = {
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottomColor: GRAY_DARKER,
    paddingVertical: 15,
  },
}
