import { combineReducers } from 'redux'
import user from './reducers/user'
import iapProducts from './reducers/iapProducts'
import initialState from './initialState'

const rootReducer = combineReducers({
  user,
  iapProducts,
})

export default (state: any, action: any) =>
  rootReducer(action.type === 'USER_LOGOUT' ? initialState : state, action)
