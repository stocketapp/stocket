import { useSelector } from 'react-redux'
import { RootState } from 'types'

export function useStockSelector() {
  return useSelector(({ stock }: RootState) => stock)
}

export function useUserSelector() {
  return useSelector(({ user }: RootState) => user)
}

export function useTradeSelector() {
  return useSelector(({ trade }: RootState) => trade)
}

export function usePortfolioSelector() {
  return useSelector(({ portfolio }: RootState) => portfolio)
}

export function useIapProductsSelector() {
  return useSelector(({ iapProducts }: RootState) => iapProducts)
}

export function useWatchlistSelector() {
  return useSelector(({ watchlistStore }: RootState) => watchlistStore)
}
