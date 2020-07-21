import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { reduce, map } from 'lodash'
import { formatCurrency, currencyToNumber } from 'utils/functions'

export default function useTotalGains(portfolioValue) {
  const { positions } = useSelector(({ stock }) => stock)
  const value = currencyToNumber(portfolioValue)

  return useMemo(() => {
    const totalArr = map(positions, el => parseFloat(el?.gains))
    const total = reduce(totalArr, (a, b) => a + b)
    const pct = ((total ?? 0 / value) * 100).toFixed(2) ?? 0
    const totalGainsPct = pct === 'NaN' ? 0 : pct
    return { totalGains: formatCurrency(total ?? 0.0), totalGainsPct }
  }, [positions, value])
}
