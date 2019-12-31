import initialState from '../initialState'

export default function(state = initialState.portfolio, action) {
  switch (action.type) {
    case 'SET_PORTFOLIO':
      return { ...state, positions: action.positions }
    default:
      return state
  }
}
