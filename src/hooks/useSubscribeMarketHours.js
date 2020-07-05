import { useEffect } from 'react'
import SocketIO from 'socket.io-client'

export default function () {
  useEffect(() => {
    const url = 'https://ws-api.iextrading.com/1.0/deep'
    const socket = SocketIO(url)

    socket.on('connect', () => {
      socket.emit(
        'subscribe',
        JSON.stringify({
          channels: ['systemevent'],
        }),
      )
    })

    socket.on('systemevent', data => {
      console.log(data)
    })
  }, [])
}
