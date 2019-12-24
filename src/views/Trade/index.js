import React, { useState } from 'react'
import { Container, SearchSymbols, Text } from 'stocket-components'
import { getStock } from 'stocket-api'
import TradeInfo from './TradeInfo'

export default function Trade() {
  const [search, setSearch] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const getStockData = async () => {
    try {
      if (search) {
        setLoading(true)
        const res = await getStock(search)
        setData(res[0])
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <SearchSymbols
        value={search}
        setValue={setSearch}
        onSearch={getStockData}
      />
      {!loading ? (
        <TradeInfo data={data} loading={loading} />
      ) : (
        <Text>Loading...</Text>
      )}
    </Container>
  )
}
