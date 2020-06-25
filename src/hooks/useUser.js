import { useSelector } from 'react-redux'

export default function useUser() {
  return useSelector(({ user }) => user)
}
