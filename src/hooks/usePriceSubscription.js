// @flow
import { useEffect, useState, useCallback } from 'react'
import { reduce } from 'lodash'
import useUser from './useUser'
import { subtract } from 'lodash'
import { updatePosition } from 'api'
import { IEX_CLOUD_KEY, IEX_URL } from '../../config'

type PriceSubscriptionType = {
  symbol: string,
  shares: [],
  previousDayPrice: number,
}

const getGains = (
  { shares, previousDayPrice, symbol, previousGains }: PriceSubscriptionType,
  price: number,
) => {
  let todayGains
  const value = shares?.length * price
  const gainsArr = shares?.map(el => price - el.price)
  const gains = reduce(gainsArr, (a, b) => a + b)
  const gainsPercentage = (gains / value) * 100
  if (previousGains) {
    todayGains = subtract(Math.abs(gains), Math.abs(previousGains))
  } else {
    todayGains = gains
  }
  const todayGainsPct = (todayGains / value) * 100
  return { gains, gainsPercentage, value, todayGains, todayGainsPct }
}

export default function usePriceSubscription(
  symbol: string,
  position: PriceSubscriptionType,
): number {
  const [price, setPrice] = useState(null)
  const { currentUser } = useUser()

  const getPrice = useCallback(async () => {
    try {
      const res = await fetch(
        `${IEX_URL}/stock/${symbol}/price?token=${IEX_CLOUD_KEY}`,
      )
      const responsePrice = await res.json()
      setPrice(responsePrice)
      if (position) {
        const positionGains = getGains(position, price)
        await updatePosition({
          uid: currentUser?.uid,
          symbol: position?.symbol,
          data: { ...positionGains },
          ...(symbol && { symbol }),
        })
      }
    } catch (err) {
      console.error('[ERROR] usePriceSubscription()', err)
    }
  }, [currentUser.uid, position, price, symbol])

  useEffect(() => {
    getPrice()
  }, [])

  useEffect(() => {
    let priceInterval
    if (symbol) {
      priceInterval = setInterval(getPrice, 5000)
    }
    return () => {
      clearInterval(priceInterval)
    }
  }, [currentUser.uid, getPrice, position, symbol])

  return price
}
