import { Dispatch, SetStateAction } from 'react'
import type { BalanceItem } from './index'
export interface CursorLineProps {
  x?: number
  scale?: any
  datum?: any
  onEvent: (item: { change: number; changePct: number; value: number; date: string }) => void
  labelText: string | number
  leftOffset: number
  rightOffset: number
}

export interface ChartLineData {
  date: Date
  value: number
  label: string
}

export interface ChartLineProps {
  data: Array<BalanceItem>
  x?: string
  y?: string
  chartProps?: {
    minDomain?: { y?: number; x?: number }
  }
  lineProps?: {}
  onEvent?: (value: any) => void
  labelText?: string | number
  labelRightOffset?: number
  labelLeftOffset?: number
  onChartEvent?: (
    item: { change: number; changePct: number; value: number; date: string } | null,
  ) => void
  tabs?: Array<string>
  onTabPress?: Dispatch<SetStateAction<GraphRange> | string>
  activeRangeTab?: string
}

export interface ChartRangeTabsProps {
  activeRangeTab?: string | undefined
  onTabPress: (tab: string) => void
  tabs: Array<string>
}

export interface ChartTabProps {
  label: string
  onPress: () => void
  activeTab?: string
}

export type GraphRange = 'now' | '1m' | '3m' | '6m' | '1y'
