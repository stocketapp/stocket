// @flow
import { useEffect, useState } from 'react'
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
  { shares, previousDayPrice, symbol }: PriceSubscriptionType,
  price: number,
) => {
  const value = shares?.length * price
  const gainsArr = shares.map(el => price - el.price)
  const gains = reduce(gainsArr, (a, b) => a + b)
  const gainsPercentage = (gains / value) * 100
  const prevValue = reduce(
    shares.map(el => previousDayPrice - el.price),
    (a, b) => a + b,
  )
  const todayGains = subtract(Math.abs(gains), Math.abs(prevValue))
  const todayGainsPct = (todayGains / value) * 100
  return { gains, gainsPercentage, value, todayGains, todayGainsPct }
}

export default function usePriceSubscription(
  position: PriceSubscriptionType,
): number {
  const [price, setPrice] = useState(null)
  const { currentUser } = useUser()

  useEffect(() => {
    const symbol = position?.symbol
    let priceInterval

    const getPrice = async () => {
      try {
        const res = await fetch(
          `${IEX_URL}/stock/${symbol}/price?token=${IEX_CLOUD_KEY}`,
        )
        const responsePrice = await res.json()
        setPrice(responsePrice)
        const positionGains = getGains(position, price)
        await updatePosition({
          uid: currentUser?.uid,
          symbol: position?.symbol,
          data: { ...positionGains },
        })
      } catch (err) {
        console.log('[ERROR] usePriceSubscription()', err)
      }
    }

    if (symbol && !price) {
      getPrice()
    } else if (symbol) {
      priceInterval = setInterval(getPrice, 5000)
    }
    return () => {
      clearInterval(priceInterval)
    }
  }, [currentUser?.uid, price, position])

  return price
}
