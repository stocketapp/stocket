import initialState from '../initialState'

export default function(state = initialState.portfolio, action) {
  switch (action.type) {
    case 'SET_SELECTED_STOCK':
      return { ...state, stock: action.stock }
    case 'SET_SEARCH':
      return { ...state, search: action.search }
    default:
      return state
  }
}
