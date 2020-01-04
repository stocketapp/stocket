import React, { useState } from 'react'
import { Container, SearchSymbols, Text } from 'components'
import { getStock } from 'api'
import TradeStockResult from './TradeStockResult'

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
    <Container ph style={{ flex: 1 }}>
      <Container width="100%" alignItems="center">
        <Text type="title">Trade</Text>
      </Container>
      <SearchSymbols
        value={search}
        setValue={setSearch}
        onSearch={getStockData}
      />
      {!loading ? (
        <TradeStockResult data={data} loading={loading} />
      ) : (
        <Text>Loading...</Text>
      )}
    </Container>
  )
}
