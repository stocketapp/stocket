import { InMemoryCache, makeVar } from '@apollo/client'

export const watchlistSymbols = makeVar([])
export const watchlistQuotes = makeVar([])

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        watchlistSymbols: {
          read() {
            return watchlistSymbols()
          },
        },
        watchlistQuotes: {
          read() {
            return watchlistQuotes()
          },
        },
      },
    },
  },
})

export default cache
