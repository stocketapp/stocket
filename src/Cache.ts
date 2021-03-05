import { InMemoryCache, makeVar, ReactiveVar } from '@apollo/client'
import { WatchlistIexQuote } from 'views/Home/Watchlist/WatchlistItem'

export const watchlistSymbolsVar: ReactiveVar<string[]> = makeVar<string[]>([])
export const isWatchlistLoadingVar = makeVar(true)
export const watchlistQuotesVar: ReactiveVar<WatchlistIexQuote[]> = makeVar<any[]>([])
export const portfolioValueVar: ReactiveVar<any> = makeVar<any>(null)
export const isPortfolioValueLoadingVar: ReactiveVar<any> = makeVar<any>(null)

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        watchlistSymbols: {
          read() {
            return watchlistSymbolsVar()
          },
        },
        isWatchlistLoading: {
          read() {
            return isWatchlistLoadingVar()
          },
        },
        watchlistQuotes: {
          read() {
            return watchlistQuotesVar()
          },
        },
        portfolioValueVar: {
          read() {
            return portfolioValueVar()
          },
        },
        portfolioValueLoading: {
          read() {
            return isPortfolioValueLoadingVar()
          },
        },
      },
    },
  },
})

export default cache
