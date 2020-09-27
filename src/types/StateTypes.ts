import { PositionType } from './index'

export interface RootState {
  user: UserState
  portfolio: PortfolioState
  trade: TradeState
  stock: StockState
  iapProducts: IapProductsState
}

export interface UserState {
  currentUser?: {
    uid: string
  } | null
  isAuth: boolean
  userInfo?: UserInfo | null
}

export interface UserInfo {
  cash: number
  email: string
  name?: string
  portfolioChange: number
  portfolioChangePct: number
  portfolioValue: string
  uid: string
}

export interface PortfolioState {
  positions: Array<PositionType>
  loading: boolean
}

export interface TradeState {
  selectedTradeAction: string
  stockQuantity: string
  stockPrice: number | null
  maxShares: number | null
  sharesOwned: number | null
  tradeViewIsOpen: boolean
  tradeStock: string | null
}

export interface StockState {
  selectedStock: string
  stockData: object
  positionsMktData: object | null
  myStockLoading: boolean
  selectedStockPosition: string | null
  watchlist: Array<any>
  positions: Array<PositionType>
}

export interface SelectedStockData {
  quote: StockQuote
  chart: Array<SelectedStockChart>
  news: Array<any>
}

export interface SelectedStockChart {
  close: number
  label: string
  date: string
}

export interface IapProductsState {
  products: Array<any> | null
}

export interface StockQuote {
  symbol?: string
  close: number
  companyName: string
  open: string
  high: string
  low: string
  volume: string
  marketCap: string
  peRatio: string
  week52High: string
  week52Low: string
  change: number
}
