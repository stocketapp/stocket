import useGetUser from './useGetUser'
import useGetWatchlist from './useGetWatchlist'

export default function useStocketQueries() {
  return {
    getWatchlist: useGetWatchlist,
    getUser: useGetUser(),
  }
}
