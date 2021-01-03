import initialState from '../initialState'
import { IexQuote } from 'types'

export interface WatchlistStore {
  watchlist: Array<IexQuote>
}

export default function watchlistStore(
  state: WatchlistStore = initialState.watchlistStore,
  action: any,
) {
  switch (action.type) {
    case 'SET_WATCHLIST':
      return {
        ...state,
        watchlist: action.payload,
      }
    case 'REMOVE_FROM_WATCHLIST':
      return {
        ...state,
        watchlist: state.watchlist.filter(el => el?.symbol !== action?.payload),
      }
    default:
      return state
  }
}
