import { useSelector } from 'react-redux'

export default function () {
  const { isMarketOpen } = useSelector(({ trade }) => trade)
  return isMarketOpen
}
