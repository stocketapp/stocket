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
    default:
      return state
  }
}
