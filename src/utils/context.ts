import { createContext, useContext } from 'react'

export const MarketHoursContext = createContext({ marketHours: false })

export const useMarketHours = () => {
  const { marketHours } = useContext(MarketHoursContext)

  return marketHours
}
