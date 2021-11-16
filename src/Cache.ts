import { InMemoryCache, makeVar, ReactiveVar } from '@apollo/client'
import { IapHubProductInformation } from 'react-native-iaphub'
import { BalanceType } from 'hooks/useBalance'
import { WatchlistIexQuote } from 'views/Home/Watchlist/WatchlistItem'
import { PortfolioType } from 'views/Home/hooks/useHomeHook'
import { UserType } from 'types'

export const watchlistSymbolsVar: ReactiveVar<string[]> = makeVar<string[]>([])
export const isWatchlistLoadingVar = makeVar(true)
export const watchlistQuotesVar = makeVar<WatchlistIexQuote[] | any[]>([])
export const portfolioValueVar = makeVar<PortfolioType | null>(null)
export const isPortfolioLoadingVar = makeVar<boolean>(true)
export const userVar = makeVar<UserType | null>(null)
export const isAuthenticatedVar = makeVar<boolean>(false)
export const balanceVar = makeVar<BalanceType | object>({})
export const productsVar = makeVar<IapHubProductInformation[]>([])

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
        products: {
          read() {
            return productsVar()
          },
        },
      },
    },
  },
})

export default cache
