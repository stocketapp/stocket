import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Container, Text, Graph } from 'components'
import {
  GREEN,
  SUB_BACKGROUND,
  BACKGROUND,
  GRAY_DARKER,
  DARK_TEXT,
} from 'utils/colors'

export default function Stock() {
  return (
    <View style={styles.container} ph>
      <View>
        <View style={{ paddingHorizontal: 16 }}>
          <Text type="heading" weight="900">
            Microsoft
          </Text>
          <Text>MSFT</Text>
        </View>

        <Graph />
        <View />
      </View>

      <View style={styles.bottom}>
        <Text weight="800">MSFT</Text>

        <TouchableOpacity>
          <View style={styles.button}>
            <Text color={DARK_TEXT} weight="700">
              Trade
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
    justifyContent: 'space-between',
    paddingTop: 40,
  },
  bottom: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: GREEN,
    paddingHorizontal: 22,
    paddingVertical: 6,
    borderRadius: 100,
  },
}
