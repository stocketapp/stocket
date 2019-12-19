import initialState from '../initialState'

const { user: userState } = initialState

export default function user(state = userState, action) {
  switch (action.type) {
    case 'IS_AUTHENTICATED':
      return { ...state, isAuth: action.isAuth }
    case 'SET_USER':
      return { ...state, currentUser: action.currentUser }
    default:
      return state
  }
}
