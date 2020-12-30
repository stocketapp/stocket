import useGetUser from './useGetUser'
import useGetWatchlist, { WatchlistResult } from './useGetWatchlist'

type StocketQueries = {
  useGetWatchlist: () => WatchlistResult
  useGetUser: () => void
}

const stocketQueries: StocketQueries = {
  useGetWatchlist: useGetWatchlist,
  useGetUser: useGetUser,
}

export default stocketQueries
