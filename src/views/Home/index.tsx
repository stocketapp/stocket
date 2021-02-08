import React from 'react'
import { Container } from '@components'
import { WatchlistList } from './Watchlist'

export default function Home() {
  return (
    <Container fullView safeAreaTop ph>
      <WatchlistList />
    </Container>
  )
}
