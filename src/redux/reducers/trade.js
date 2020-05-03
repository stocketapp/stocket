import initialState from '../initialState'

export default function(state = initialState.trade, action) {
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
    default:
      return state
  }
}
