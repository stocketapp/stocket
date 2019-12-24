// @flow
// import { useEffect, useState } from 'react'
import { WTD_API_KEY } from '../../config'

async function get(query: string) {
  const url = `https://api.worldtradingdata.com/api/v1/${query}&api_token=${WTD_API_KEY}`
  const res = await fetch(url, {
    method: 'GET',
    Accept: 'applicatiion/json',
  })

  return res
}

export async function getStock(symbols: string | Array<string>) {
  const symbolsStr = typeof symbols === 'string' ? symbols : symbols.join(',')
  const res = await get(`stock?symbol=${symbolsStr}`)
  const { data } = await res.json()
  return data
}

// export async function useGetStock(symbols: string | Array<string>) {
//   const [stocks, setStocks] = useState(null)
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     async function getStocks() {
//       try {
//         setLoading(true)
//         const res = await get(`stock?symbol=${symbols}`)
//         const { data } = await res.json()
//         setStocks(data)
//       } catch (err) {
//         console.log(err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     getStocks()
//   }, [symbols])

//   return { stocks, loading }
// }
