import initialState from '../initialState'

export default function(state = initialState.portfolio, action) {
  switch (action.type) {
    case 'SET_PORTFOLIO_DATA':
      return { ...state, portfolioData: action.portfolioData }
    default:
      return state
  }
}