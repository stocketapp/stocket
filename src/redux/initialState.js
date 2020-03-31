export default {
  user: {
    isAuth: false,
    currentUser: null,
    userInfo: null,
  },
  portfolio: {
    positions: [],
    loading: true,
  },
  trade: {
    selectedTradeAction: 'BUY',
    stockQuantity: null,
    stockPrice: null,
    maxShares: null,
    sharesOwned: null,
  },
  stock: {
    selectedStock: {},
    stockData: {},
    positionsMktData: {},
  },
}
