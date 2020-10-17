import initialState from '../initialState'
import type { IapProductsState } from 'types'

interface Action {
  products: IapProductsState
  type: string
}
export default function (state = initialState.iapProducts, action: Action) {
  switch (action.type) {
    case 'SET_IAP_PRODUCTS':
      return { ...state, products: action.products }
    default:
      return state
  }
}
