// @flow
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'components'
import { SUB_BACKGROUND, GREEN, LABEL } from 'utils/colors'

const MarketStatus = ({ status }: { status: boolean }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 12 }} weight={status ? 'Medium' : 'Light'}>
        Trading
      </Text>
      <View
        style={{ ...styles.dot, backgroundColor: status ? GREEN : LABEL }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  dot: {
    height: 8,
    width: 8,
    borderRadius: 6,
    backgroundColor: GREEN,
    marginLeft: 4,
  },
  container: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: SUB_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    opacity: 0.7,
    right: 10,
    top: '14%',
  },
})

export default MarketStatus
