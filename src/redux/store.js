import { combineReducers } from 'redux'
import user from './reducers/user'
import portfolio from './reducers/portfolio'

export default combineReducers({
  user,
  portfolio,
})
