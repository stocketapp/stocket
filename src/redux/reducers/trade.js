import initialState from '../initialState'

export default function(state = initialState.trade, action) {
  switch (action.type) {
    case 'SELECTED_TRADE_ACTION':
      return { ...state, selectedTradeAction: action.selectedTradeAction }
    default:
      return state
  }
}
