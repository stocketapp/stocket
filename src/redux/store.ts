import { combineReducers } from 'redux'
import user from './reducers/user'
import portfolio from './reducers/portfolio'
import trade from './reducers/trade'
import stock from './reducers/stock'
import graph from './reducers/graph'
import iapProducts from './reducers/iapProducts'
import watchlistStore from './reducers/watchlistStore'
import initialState from './initialState'

const rootReducer = combineReducers({
  user,
  portfolio,
  trade,
  stock,
  graph,
  iapProducts,
  watchlistStore,
})

export default (state: any, action: any) =>
  rootReducer(action.type === 'USER_LOGOUT' ? initialState : state, action)
