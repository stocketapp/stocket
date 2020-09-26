import { combineReducers } from 'redux'
import user from './reducers/user'
import portfolio from './reducers/portfolio'
import trade from './reducers/trade'
import stock from './reducers/stock'
import graph from './reducers/graph'
import iapProducts from './reducers/iapProducts'

const rootReducer = combineReducers({
  user,
  portfolio,
  trade,
  stock,
  graph,
  iapProducts,
})

export default (state: any, action: any) =>
  rootReducer(action.type === 'USER_LOGOUT' ? null : state, action)
