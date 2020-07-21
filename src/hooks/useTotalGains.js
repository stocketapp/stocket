import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { reduce, map } from 'lodash'
import { formatCurrency } from 'utils/functions'

export default function useTotalGains() {
  const { positions } = useSelector(({ stock }) => stock)

  return useMemo(() => {
    const total = map(positions, el => parseFloat(el?.gains))
    return formatCurrency(reduce(total, (a, b) => a + b))
  }, [positions])
}
