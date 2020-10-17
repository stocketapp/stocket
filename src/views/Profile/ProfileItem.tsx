import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Text } from '@components'
import { LABEL, GRAY_DARKER } from '@utils/colors'

type Props = {
  onPress?: () => void
  label: string
  value: string
}

export default function ({ onPress, label, value }: Props) {
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

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottomColor: GRAY_DARKER,
    paddingVertical: 15,
  },
})
