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
  noPh?: boolean,
}

export type TextProps = {
  type?: string,
  cap?: boolean,
  color?: string,
  positive?: boolean,
  negative?: boolean,
  children?: Text.propTypes.children,
  style?: Text.propTypes.style,
}

export type TradeInfoProps = {
  data: {
    symbol: string,
    name: string,
    price: string,
  } | null,
  loading: boolean,
}

export type SearchSymbolsProps = {
  value: string,
  setvalue: () => void,
  onSearch: () => void,
}
