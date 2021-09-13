import { useSelector } from 'react-redux'
import { RootState } from 'types'

export function useUserSelector() {
  return useSelector(({ user }: RootState) => user)
}

export function useIapProductsSelector() {
  return useSelector(({ iapProducts }: RootState) => iapProducts)
}
