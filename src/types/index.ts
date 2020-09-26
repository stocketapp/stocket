import { TextStyle, ViewStyle } from 'react-native'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { Dispatch, ReactNode, SetStateAction } from 'react'

export interface SvgProps {
  size?: number
  children?: ReactNode
  color?: string
  filled?: boolean
}

export interface IconProps {
  size?: number
  color?: string
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
  style?: ViewStyle | {}
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
  value: string | null
  setValue: Dispatch<SetStateAction<string>>
  onSearch?: () => void
}

export interface SearchResultType {
  symbol: string
  securityName: string
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

export interface BalanceItem {
  date: string
  value: number
  change: number
  changePct: number
}

export interface ProductValue {
  productId: string
  value: number
  price: number
}

export type DocReference = FirebaseFirestoreTypes.DocumentReference
export type DocumentSnapshot = FirebaseFirestoreTypes.DocumentSnapshot<
  FirebaseFirestoreTypes.DocumentData
>

export interface CurrentUser {
  uid: string
}

export * from './ChartTypes'
export * from './StateTypes'
