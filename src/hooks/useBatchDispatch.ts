import { useDispatch } from 'react-redux'
import { DispatchAction } from 'types'

export default function useBatchDispatch() {
  const dispatch = useDispatch()
  return (type: Array<DispatchAction>) =>
    type.map(el => dispatch({ type: el.type, payload: el.payload }))
}
