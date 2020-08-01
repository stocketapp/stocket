// @flow
import { useEffect, useState } from 'react'
import { reduce } from 'lodash'
import useUser from './useUser'
import { subtract } from 'lodash'
import RNEventSource from 'react-native-event-source'
import { updatePosition } from 'api'
import { IEX_CLOUD_KEY, IEX_CLOUD_SSE_URL } from '../../config'

type PriceSubscriptionType = {
  symbol: string,
  shares: [],
  previousDayPrice: number,
}

export default function usePriceSubscription(position: PriceSubscriptionType) {
  const [data, setData] = useState({})
  const { currentUser } = useUser()
  const symbol = position?.symbol
  const shares = position?.shares
  const prevDayPrice = position?.previousDayPrice

  useEffect(() => {
    let throttleUpdate
    let stream

    const getGains = price => {
      const value = shares?.length * price
      const gainsArr = shares.map(el => price - el.price)
      const gains = reduce(gainsArr, (a, b) => a + b)
      const gainsPercentage = (gains / value) * 100
      const prevValue = reduce(
        shares.map(el => prevDayPrice - el.price),
        (a, b) => a + b,
      )
      const todayGains = subtract(Math.abs(gains), Math.abs(prevValue))
      const todayGainsPct = (todayGains / value) * 100
      return { gains, gainsPercentage, value, todayGains, todayGainsPct }
    }

    const connect = async () => {
      try {
        stream = new RNEventSource(
          `${IEX_CLOUD_SSE_URL}/stocksUSNoUTP?symbols=${symbol}&token=${IEX_CLOUD_KEY}`,
        )

        stream.addEventListener('message', async res => {
          const result = JSON.parse(res?.data)[0]
          const positionGains = getGains(result?.latestPrice)
          setData(result)
          const obj = {
            ...positionGains,
          }
          throttleUpdate = setTimeout(async () => {
            await updatePosition({ uid: currentUser?.uid, symbol, data: obj })
          }, 5000)
        })
      } catch (err) {
        console.log('[ERROR] usePriceSubscription()', err)
      }
    }

    if (symbol) {
      connect()
    }
    return () => {
      stream.removeAllListeners()
      stream.close()
      clearTimeout(throttleUpdate)
    }
  }, [currentUser?.uid, prevDayPrice, shares, symbol])

  return data
}
