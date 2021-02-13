import { InMemoryCache, makeVar } from '@apollo/client'

export const watchlistSymbols = makeVar([])
export const isWatchlistLoading = makeVar(true)

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        watchlistSymbols: {
          read() {
            return watchlistSymbols()
          },
        },
        isWatchlistLoading: {
          read() {
            return isWatchlistLoading()
          },
        },
      },
    },
  },
})

export default cache
