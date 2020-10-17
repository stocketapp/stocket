import React, { useState } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import Text from '../Text'
import { GREEN, LABEL } from '@utils/colors'
import type { ChartTabProps, ChartRangeTabsProps } from 'types'

const ChartTab = ({ label, onPress = () => null, activeTab }: ChartTabProps) => {
  const [opacity, setOpacity] = useState(1)
  const isActive = activeTab === label

  return (
    <Pressable onPress={onPress} onPressIn={() => setOpacity(0.6)} onPressOut={() => setOpacity(1)}>
      <View style={[styles.tab, { opacity }]}>
        <Text
          style={styles.label}
          type="subtext"
          weight={isActive ? 'Black' : 'Medium'}
          color={isActive ? GREEN : LABEL}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  )
}

const ChartRangeTabs = ({ activeRangeTab, onTabPress, tabs }: ChartRangeTabsProps) => (
  <View style={styles.container}>
    {tabs.map((tabLabel, i) => (
      <ChartTab
        label={tabLabel}
        onPress={() => onTabPress(tabLabel)}
        activeTab={activeRangeTab}
        key={i}
      />
    ))}
  </View>
)

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
    borderRadius: 50,
    width: 40,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    textTransform: 'capitalize',
    fontSize: 12,
  },
})
