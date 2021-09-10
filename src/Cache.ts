import { InMemoryCache, makeVar, ReactiveVar } from '@apollo/client'
import { WatchlistIexQuote } from 'views/Home/Watchlist/WatchlistItem'
import { UserType } from 'types'
import { PortfolioType } from 'views/Home/hooks/useHomeHook'
import { BalanceType } from 'hooks/useBalance'

export const watchlistSymbolsVar: ReactiveVar<string[]> = makeVar<string[]>([])
export const isWatchlistLoadingVar = makeVar(true)
export const watchlistQuotesVar = makeVar<WatchlistIexQuote[] | null>(null)
export const portfolioValueVar = makeVar<PortfolioType | null>(null)
export const isPortfolioLoadingVar = makeVar<boolean>(true)
export const userVar = makeVar<UserType | null>(null)
export const isAuthenticatedVar = makeVar<boolean>(false)
export const balanceVar = makeVar<BalanceType | object>({})

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
            return isPortfolioLoadingVar()
          },
        },
        user: {
          read() {
            return userVar()
          },
        },
        isAuthenticated: {
          read() {
            return isAuthenticatedVar()
          },
        },
        balance: {
          read() {
            return balanceVar()
          },
        },
      },
    },
  },
})

export default cache
