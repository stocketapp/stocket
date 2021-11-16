import { ViewStyle } from 'react-native'
import { ReactNode } from 'react'

export interface UserType {
  id: string
  uid: string
  displayName: string
  email: string
  cash: number
}

export interface SvgProps {
  size?: number
  children?: ReactNode
  color?: string
  filled?: boolean
}

export interface IconProps {
  size?: number
  color?: string
  filled?: boolean
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
  symbol: string
  avgPrice: number
  totalGains: number
  totalValue: number
  change24h: number
  change24hPct: number
  size: number
  totalInvested: number
  totalGainsPct: number
  logo: string
  companyName: string
}

export interface TradeDataType {
  symbol?: string
  action?: string
  quantity?: string
  price?: number
  value?: number
  name?: string
  date?: number
}

export interface BalanceItem {
  date: string | Date
  value: number
  change?: number
  changePct?: number
  label?: string
}

export interface ProductValue {
  sku: string
  value: number
  price: number
}

export interface CurrentUser {
  uid: string
}

export interface ArticleType {
  image: string
  headline: string
  source: string
  url: string
}

// v2.x.x Types that matches GraphQL API Types

export interface IEXQuote {
  symbol: string
  close: number
  companyName: string
  open: string
  high: string
  low: string
  iexVolume: string
  marketCap: string
  peRatio: string
  week52High: string
  week52Low: string
  change: number
  latestPrice: number
  logo: string
  changePercent: number
  changePercentS: string
}

export interface IEXChartQuote {
  symbol: string
  close: number
  changePercent: number
  label: string
  date: string
  minute: string
  changeOverTime: number
}

export interface UserBalance {
  cash: number
  portfolioValue: number
}

export * from './ChartTypes'
export * from './StateTypes'
