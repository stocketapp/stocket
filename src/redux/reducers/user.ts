import initialState from '../initialState'
// import type {  } from 'types'

const { user: userState } = initialState

interface UserAction {
  isAuth: boolean
  currentUser: object
  userInfo: object
  type: string
}

export default function (state = userState, action: UserAction) {
  switch (action.type) {
    case 'IS_AUTHENTICATED':
      return { ...state, isAuth: action.isAuth }
    case 'SET_USER':
      return { ...state, currentUser: action.currentUser }
    case 'SET_USER_INFO':
      return { ...state, userInfo: action.userInfo }
    default:
      return state
  }
}
