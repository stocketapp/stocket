import initialState from '../initialState'

export default function(state = initialState.stock, action) {
  switch (action.type) {
    case 'SET_SELECTED_STOCK':
      return { ...state, selectedStock: action.stock }
    case 'SET_SEARCH':
      return { ...state, search: action.search }
    case 'SET_SELECTED_STOCK_DATA':
      return { ...state, stockData: action.stockData }
    default:
      return state
  }
}
