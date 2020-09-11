// <reference path="react/inidex.d.ts" />

import { TextStyle, ViewStyle } from 'react-native'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { ReactNode } from 'react'

export interface IconProps {
  size?: number
  children: ReactNode
  color?: string
  filled?: boolean
}

export interface ContainerProps {
  children: ReactNode
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between'
  alignItems?: 'center' | 'flex-start' | 'flex-end'
  horizontal?: boolean
  separate?: boolean
  ph?: boolean
  top?: number
  bottom?: number
  width?: string | number
  style?: ViewStyle
  fullView?: boolean
  safeAreaTop?: boolean
  safeAreaBottom?: boolean
}

export interface TextProps {
  type?: 'heading' | 'title' | 'label' | 'subtext' | 'big'
  cap?: boolean
  color?: string
  children?: any
  style?: TextStyle
  status?: 'negative' | 'positive'
  weight?:
    | 'Black'
    | 'Heavy'
    | 'Bold'
    | 'Semibold'
    | 'Medium'
    | 'Regular'
    | 'Light'
    | 'Thin'
    | 'Ultralight'
}

export interface TradeInfoProps {
  data: {
    symbol: string
    name: string
    price: string
    change_pct: string
    day_change: string
    eps: string
    price_open: string
  }
  loading?: boolean
}

export interface SearchSymbolsProps {
  value: string
  setvalue: () => void
  onSearch: () => void
}

export interface LabelProps {
  title?: string
  value?: string
  children: ReactNode
  style?: ViewStyle
}

export interface PositionType {
  gains: number
  name: string
  gainsPercentage: number
  symbol: string
  uid: string
  value: number
  todayGainsPct: number
  todayGains: number
}

export interface TradeDataType {
  symbol: string
  action: string
  quantity: number
  price: number
  value: number
}

export type DocReference = FirebaseFirestoreTypes.DocumentReference
