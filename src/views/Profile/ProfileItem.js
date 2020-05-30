import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text } from 'components'
import { LABEL, GRAY_DARKER } from 'utils/colors'

export default function ({ onPress, label, value }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <View style={styles.item}>
        <Text type="label" color={LABEL}>
          {label}
        </Text>
        <Text type="label" weight="Medium">
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
    borderBottomWidth: 0.2,
    borderBottomColor: GRAY_DARKER,
    paddingBottom: 15,
  },
}
