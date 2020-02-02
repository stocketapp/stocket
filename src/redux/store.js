import { combineReducers } from 'redux'
import user from './reducers/user'
import portfolio from './reducers/portfolio'
import trade from './reducers/trade'

export default combineReducers({
  user,
  portfolio,
  trade,
})
