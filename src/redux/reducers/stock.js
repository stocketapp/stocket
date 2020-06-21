import initialState from '../initialState'

export default function (state = initialState.stock, action) {
  switch (action.type) {
    case 'SET_SELECTED_STOCK':
      return { ...state, selectedStock: action.selectedStock }
    case 'SET_SEARCH':
      return { ...state, search: action.search }
    case 'SET_SELECTED_STOCK_RT_DATA':
      return { ...state, selectedStockRTData: action.stockData }
    case 'ALL_MY_STOCKS':
      return { ...state, positions: action.positions }
    case 'MY_STOCKS_MKT_DATA':
      return { ...state, positionsMktData: action.positionsMktData }
    case 'SELECTED_STOCK_POSITION':
      return { ...state, selectedStockPosition: action.selectedStockPosition }
    case 'SET_WATCHLIST':
      return { ...state, watchlist: action.watchlist }
    default:
      return state
  }
}
