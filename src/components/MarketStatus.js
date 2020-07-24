// @flow
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Text from './Text'
import { SUB_BACKGROUND, GREEN, LABEL } from 'utils/colors'

type Props = {
  label: string,
  status: boolean,
}

const MarketStatus = ({ status, label = 'Trading' }: Props) => (
  <View style={styles.container}>
    <Text style={{ fontSize: 12 }} weight={status ? 'Bold' : 'Light'}>
      {label}
    </Text>
    <View style={{ ...styles.dot, backgroundColor: status ? GREEN : LABEL }} />
  </View>
)

const styles = StyleSheet.create({
  dot: {
    height: 8,
    width: 8,
    borderRadius: 6,
    backgroundColor: GREEN,
    marginLeft: 4,
  },
  container: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    flexDirection: 'row',
    backgroundColor: SUB_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    opacity: 0.7,
    maxHeight: 38,
    marginBottom: 2,
  },
})

export default MarketStatus
