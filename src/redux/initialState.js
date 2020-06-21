export default {
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
    stockPrice: null,
    maxShares: null,
    sharesOwned: null,
    tradeViewIsOpen: false,
    tradeStock: null,
  },
  stock: {
    selectedStock: {},
    stockData: {},
    positionsMktData: null,
    myStockLoading: false,
    selectedStockPosition: null,
    watchlist: [],
  },
  iapProducts: {
    products: null,
  },
}
