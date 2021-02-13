import initialState from '../initialState'
import { filter } from 'lodash'

interface WatchlistAction {
  type: string
  payload: any
}

export default function (state = initialState.stock, action: WatchlistAction) {
  switch (action.type) {
    case 'ADD_TO_WATCHLIST':
      return {
        ...state,
        watchlist: action.payload,
      }
    case 'REMOVE_FROM_WATCHLIST':
      return {
        ...state,
        watchlist: filter(
          state.watchlist,
          (el: { quote: { symbol: string } }) => el.quote.symbol !== action.payload,
        ),
      }
    default:
      return state
  }
}
