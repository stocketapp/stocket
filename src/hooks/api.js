// import { useEffect } from 'react'
// import io from 'socket.io-client'
// import { useDispatch } from 'react-redux'

// const socket = io('https://ws-api.iextrading.com/1.0/last', {
//   forceNew: true,
// })

// export function useGetLast(symbols: string | [string] = 'aapl') {
//   const dispatch = useDispatch()
//   // console.log(portfolioData)

//   useEffect(() => {
//     socket.on('connect', () => {
//       console.log('useGetLast is connected - ', socket.connected)
//       socket.emit('subscribe', symbols)
//     })
//     socket.on('message', message => {
//       console.log('on message', JSON.parse(message))
//       dispatch({
//         type: 'SET_PORTFOLIO_DATA',
//         portfolioData: JSON.parse(message),
//       })
//     })

//     return () => socket.disconnect()
//   }, [symbols, dispatch])
// }
