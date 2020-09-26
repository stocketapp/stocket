import { PositionType } from './index'

export interface RootState {
  user: UserState
  portfolio: PortfolioState
  trade: TradeState
  stock: StockState
  iapProducts: IapProductsState
  // [key: string]:
  //   | UserState
  //   | PortfolioState
  //   | TradeState
  //   | StockState
  //   | IapProductsState
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
  selectedStock: object
  stockData: object
  positionsMktData: object | null
  myStockLoading: boolean
  selectedStockPosition: string | null
  watchlist: Array<any>
}

export interface IapProductsState {
  products: Array<any> | null
}
