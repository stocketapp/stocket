import { useDispatch } from 'react-redux'

export default function useDispatchAction<T>() {
  const dispatch = useDispatch()
  return (type: string, payload: T) => dispatch({ type, payload })
}
