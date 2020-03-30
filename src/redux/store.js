import { combineReducers } from 'redux'
import user from './reducers/user'
import portfolio from './reducers/portfolio'
import trade from './reducers/trade'
import stock from './reducers/stock'

export default combineReducers({
  user,
  portfolio,
  trade,
  stock,
})
