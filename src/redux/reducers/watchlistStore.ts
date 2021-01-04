import initialState from '../initialState'
import { IexQuote, ReduxAction } from 'types'

export interface WatchlistStore {
  watchlist: Array<IexQuote>
}

const store = initialState.watchlistStore

export default function watchlistStore(state: WatchlistStore = store, action: ReduxAction<any>) {
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
    case 'ADD_TO_WATCHLIST':
      return {
        ...state,
        watchlist: [...state.watchlist, action?.payload],
      }
    default:
      return state
  }
}
