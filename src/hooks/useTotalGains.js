import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { reduce, map } from 'lodash'
import { formatCurrency, currencyToNumber } from 'utils/functions'

export default function useTotalGains(portfolioValue) {
  const { positions } = useSelector(({ stock }) => stock)
  const value = currencyToNumber(portfolioValue)

  return useMemo(() => {
    const totalArr = map(positions, el => parseFloat(el?.gains))
    const total = reduce(totalArr, (a, b) => a + b) ?? 0
    const pct = (total / value) * 100
    const totalGainsPct = (typeof gainsPct !== 'number' ? 0 : pct).toFixed(2)
    return { totalGains: formatCurrency(total ?? 0.0), totalGainsPct }
  }, [positions, value])
}
