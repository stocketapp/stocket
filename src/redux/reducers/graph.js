import initialState from '../initialState'

export default function (state = initialState.portfolio, action) {
  switch (action.type) {
    case 'SET_GRAPH_VALUE':
      return { ...state, graphValue: action.graphValue }
    case 'SET_PORTFOLIO_LOADING':
      return { ...state, loading: action.payload }
    default:
      return state
  }
}
