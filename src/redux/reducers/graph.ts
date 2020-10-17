import initialState from '../initialState'

interface Action {
  payload: boolean
  graphValue: any
  type: string
}
export default function (state = initialState.portfolio, action: Action) {
  switch (action.type) {
    case 'SET_GRAPH_VALUE':
      return { ...state, graphValue: action.graphValue }
    case 'SET_PORTFOLIO_LOADING':
      return { ...state, loading: action.payload }
    default:
      return state
  }
}
