import { useState, Dispatch, SetStateAction } from 'react'
import { Text } from '@components'
import { StockChartRangeTabsContainer, Tab, TabPressable } from './styles'
import { useTheme } from '@emotion/react'

const ChartRangeTab = ({ label, onPress, activeTab }: ChartRangeTabProps) => {
  const [opacity, setOpacity] = useState(1)
  const { colors } = useTheme()
  const isActive = activeTab === label
  return (
    <TabPressable
      onPress={onPress}
      onPressIn={() => setOpacity(0.6)}
      onPressOut={() => setOpacity(1)}
      style={{ backgroundColor: isActive ? colors.BG_DARK_SECONDARY : 'transparent' }}
    >
      <Tab style={{ opacity }}>
        <Text
          style={{ textTransform: 'capitalize' }}
          type="subtext"
          weight={isActive ? 'Black' : 'Bold'}
          color={isActive ? 'GREEN' : 'GRAY'}
        >
          {label}
        </Text>
      </Tab>
    </TabPressable>
  )
}

const tabs: GraphRange[] = ['now', '1m', '3m', '6m', '1y']
const StockChartRangeTabs = ({
  activeRangeTab,
  onTabPress,
}: StockChartRangeTabsProps) => {
  return (
    <StockChartRangeTabsContainer>
      {tabs.map((tabLabel, i) => (
        <ChartRangeTab
          label={tabLabel}
          onPress={() => onTabPress(tabLabel)}
          activeTab={activeRangeTab}
          key={i}
        />
      ))}
    </StockChartRangeTabsContainer>
  )
}

export default StockChartRangeTabs

export interface StockChartRangeTabsProps {
  activeRangeTab: string
  onTabPress: Dispatch<SetStateAction<GraphRange>>
}

export interface ChartRangeTabProps {
  label: string
  onPress: () => void
  activeTab: SetStateAction<string>
}

export type GraphRange = 'now' | '1m' | '3m' | '6m' | '1y'
