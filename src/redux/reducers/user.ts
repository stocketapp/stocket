import initialState from '../initialState'
import type { DispatchAction } from 'types'

const { user: userState } = initialState

export default function (state = userState, action: DispatchAction) {
  const { type, payload } = action
  switch (type) {
    case 'IS_AUTHENTICATED':
      return { ...state, isAuth: payload }
    case 'SET_USER':
      return { ...state, currentUser: payload }
    case 'SET_USER_INFO':
      return { ...state, userInfo: payload }
    default:
      return state
  }
}
