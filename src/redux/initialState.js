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
    stockQuantity: '0',
    stockPrice: null,
    maxShares: null,
    sharesOwned: null,
    tradeViewIsOpen: false,
  },
  stock: {
    selectedStock: {},
    stockData: {},
    positionsMktData: null,
  },
}
