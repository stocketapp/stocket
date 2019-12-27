// @flow
import { View, Text } from 'react-native'

export type IconProps = {
  size?: number,
  children: React$Node,
  color?: string,
}

export type ContainerProps = {
  children: React$Node,
  style?: View.propTypes.style,
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between',
  alignItems?: 'center' | 'flex-start' | 'flex-end',
  horizontal?: boolean,
  separate?: boolean,
  ph?: boolean,
  top?: number,
  width?: string | number,
}

export type TextProps = {
  type?: 'heading' | 'title' | 'label',
  cap?: boolean,
  color?: string,
  children?: Text.propTypes.children,
  style?: Text.propTypes.style,
  status?: 'negative' | 'positive',
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
  loading: boolean,
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
  style?: View.propTypes.style,
}
