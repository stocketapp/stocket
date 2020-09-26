import { useSelector } from 'react-redux'
import { RootState } from 'types'
import { find } from 'lodash'

export default function useStateSelector(selector: string) {
  const selected = useSelector((state: RootState) => state)
  const state = {
    user: selected.user,
    portfolio: selected.portfolio,
    trade: selected.trade,
    stock: selected.stock,
    iapProducts: selected.iapProducts,
  }

  const x = find(state, selector)
  console.log('find(state, selector)', x)

  return find(state, selector)
}
