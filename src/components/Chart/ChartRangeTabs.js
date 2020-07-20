import React, { useState } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { Text } from 'components'
import { GREEN, DARK_TEXT } from 'utils/colors'

const ChartTab = ({ label, onPress = () => null }) => {
  const [opacity, setOpacity] = useState(1)

  const onPressOut = () => {
    setOpacity(1)
    onPress()
  }

  return (
    <Pressable onPressIn={() => setOpacity(0.6)} onPressOut={onPressOut}>
      <View style={[styles.tab, { opacity }]}>
        <Text style={styles.label} type="subtext" weight="Bold">
          {label}
        </Text>
      </View>
    </Pressable>
  )
}

const ChartRangeTabs = ({ children }) => {
  return <View style={styles.container}>{children}</View>
}

ChartRangeTabs.Tab = ChartTab
export default ChartRangeTabs

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 40,
    justifyContent: 'space-between',
  },
  tab: {
    backgroundColor: GREEN,
    borderRadius: 50,
    width: 40,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: DARK_TEXT,
    textTransform: 'capitalize',
    fontSize: 10,
  },
})
