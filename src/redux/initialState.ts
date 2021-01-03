import type { RootState } from 'types'

const initialState: RootState = {
  user: {
    isAuth: false,
    currentUser: null,
    userInfo: null,
  },
  portfolio: {
    positions: [],
    loading: false,
  },
  trade: {
    selectedTradeAction: 'BUY',
    stockQuantity: '0',
    stockPrice: 0,
    maxShares: 0,
    sharesOwned: 0,
    tradeViewIsOpen: false,
    tradeStock: null,
  },
  stock: {
    selectedStock: '',
    stockData: {},
    positionsMktData: null,
    myStockLoading: false,
    selectedStockPosition: null,
    watchlist: [],
    positions: [],
  },
  iapProducts: {
    products: null,
  },
  watchlistStore: {
    watchlist: [],
  },
}

export default initialState
