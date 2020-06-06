import initialState from '../initialState'

export default function (state = initialState.portfolio, action) {
  switch (action.type) {
    case 'SET_PORTFOLIO':
      return { ...state, positions: action.payload }
    case 'SET_PORTFOLIO_LOADING':
      return { ...state, loading: action.payload }
    default:
      return state
  }
}
