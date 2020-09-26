// @flow
import { useEffect, useState, useCallback } from 'react'
import { reduce } from 'lodash'
import useUser from './useUser'
import { subtract } from 'lodash'
import { updatePosition } from '@api'
import { IEX_CLOUD_KEY, IEX_URL } from '../../config'

interface PriceSubscriptionType {
  symbol: string
  shares: []
  previousDayPrice: number
}

const getGains = (
  { shares, previousDayPrice }: PriceSubscriptionType,
  price: number,
) => {
  const value = shares?.length * price
  const gainsArr = shares?.map((el: { price: number }) => price - el.price)
  const gains = reduce(gainsArr, (a, b) => a + b) ?? 0
  const gainsPercentage = (gains / value) * 100
  const prevValue =
    reduce(
      shares.map((el: { price: number }) => previousDayPrice - el.price),
      (a, b) => a + b,
    ) ?? 0
  const todayGains = subtract(Math.abs(gains), Math.abs(prevValue))
  const todayGainsPct = (todayGains / value) * 100
  return { gains, gainsPercentage, value, todayGains, todayGainsPct }
}

export default function usePriceSubscription(
  symbol: string,
  position: PriceSubscriptionType,
): number {
  const [price, setPrice] = useState(0)
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
        })
      }
    } catch (err) {
      console.error('[ERROR] usePriceSubscription()', err)
    }
  }, [currentUser?.uid, position, price, symbol])

  useEffect(() => {
    getPrice()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let priceInterval: NodeJS.Timeout
    if (symbol) {
      priceInterval = setInterval(getPrice, 5000)
    }
    return () => {
      clearInterval(priceInterval)
    }
  }, [currentUser.uid, getPrice, position, symbol])

  return price
}
