// @flow
import React, { useState } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { Text } from 'components'
import { GREEN, LABEL } from 'utils/colors'

type ChartTabTypes = {
  label: string,
  onPress: () => void,
  activeTab: string,
}
const ChartTab = ({
  label,
  onPress = () => null,
  activeTab,
}: ChartTabTypes) => {
  const [opacity, setOpacity] = useState(1)
  const isActive = activeTab === label

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setOpacity(0.6)}
      onPressOut={() => setOpacity(1)}
    >
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

const ChartRangeTabs = ({ children, activeRangeTab, onTabPress, tabs }) => (
  <View style={styles.container}>
    {tabs.map(el => (
      <ChartTab
        label={el}
        onPress={() => onTabPress(el)}
        activeTab={activeRangeTab}
        key={el}
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
    fontSize: 10,
  },
})
