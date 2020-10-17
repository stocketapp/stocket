import { useDispatch } from 'react-redux'

export default function useDispatchAction() {
  const dispatch = useDispatch()
  return (type: string, payload: any) => dispatch({ type, payload })
}
