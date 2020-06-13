import initialState from '../initialState'

export default function (state = initialState.iapProducts, action) {
  switch (action.type) {
    case 'SET_IAP_PRODUCTS':
      return { ...state, products: action.products }
    default:
      return state
  }
}
