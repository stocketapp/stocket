import initialState from '../initialState'
import type { TradeDataType } from 'types'

interface TradeAction {
  selectedTradeAction: string
  stockQuantity: number
  stockPrice: number
  maxShares: number
  sharesOwned: number
  tradeData: TradeDataType
  tradeViewIsOpen: boolean
  tradeStock: object
  isMarketOpen: boolean
  type: string
}

export default function (state = initialState.trade, action: TradeAction) {
  switch (action.type) {
    case 'SELECTED_TRADE_ACTION':
      return { ...state, selectedTradeAction: action.selectedTradeAction }
    case 'SET_QUANTITY':
      return { ...state, stockQuantity: action.stockQuantity }
    case 'STOCK_PRICE':
      return { ...state, stockPrice: action.stockPrice }
    case 'MAX_SHARES':
      return { ...state, maxShares: action.maxShares }
    case 'SHARES_OWNED':
      return { ...state, sharesOwned: action.sharesOwned }
    case 'SET_TRADE_DATA':
      return { ...state, tradeData: action.tradeData }
    case 'TRADE_VIEW_IS_OPEN':
      return { ...state, tradeViewIsOpen: action.tradeViewIsOpen }
    case 'TRADE_STOCK':
      return { ...state, tradeStock: action.tradeStock }
    case 'SET_MARKET_OPEN':
      return { ...state, isMarketOpen: action.isMarketOpen }
    default:
      return state
  }
}
