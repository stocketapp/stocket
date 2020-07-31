// @flow
import { Text } from 'react-native'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet'

export type IconProps = {
  size?: number,
  children: React$Node,
  color?: string,
  filled?: boolean,
}

export type ContainerProps = {
  children: React$Node,
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between',
  alignItems?: 'center' | 'flex-start' | 'flex-end',
  horizontal?: boolean,
  separate?: boolean,
  ph?: boolean,
  top?: number,
  bottom?: number,
  width?: string | number,
  style?: ViewStyleProp,
  fullView?: boolean,
  safeAreaTop?: boolean,
  safeAreaBottom?: boolean,
}

export type TextProps = Text.propTypes & {
  type?: 'heading' | 'title' | 'label' | 'subtext' | 'big',
  cap?: boolean,
  color?: string,
  children?: Text.propTypes.children,
  style?: Text.propTypes.style,
  status?: 'negative' | 'positive',
  weight?:
    | 'Black'
    | 'Heavy'
    | 'Bold'
    | 'Semibold'
    | 'Medium'
    | 'Regular'
    | 'Light'
    | 'Thin'
    | 'Ultralight',
}

export type TradeInfoProps = {
  data: {
    symbol: string,
    name: string,
    price: string,
    change_pct: string,
    day_change: string,
    eps: string,
    price_open: string,
  },
  loading?: boolean,
}

export type SearchSymbolsProps = {
  value: string,
  setvalue: () => void,
  onSearch: () => void,
}

export type LabelProps = {
  title?: string,
  value?: string,
  children: React$Node,
  style?: ViewStyleProp,
}

export type PositionType = {
  gains: number,
  name: string,
  gainsPercentage: number,
  symbol: string,
  uid: string,
  value: number,
  todayGainsPct: number,
  todayGains: number,
}

export type TradeDataType = {
  symbol: string,
  action: string,
  quantity: number,
  price: number,
  value: number,
}

export type DocReference = FirebaseFirestoreTypes.DocumentReference
