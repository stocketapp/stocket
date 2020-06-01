import { useSelector } from 'react-redux'

export default function useUser() {
  const info = useSelector(({ user }) => user)
  return info
}
