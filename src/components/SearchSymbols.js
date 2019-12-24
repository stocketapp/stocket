import React, { useEffect, useState } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { useDebounce } from 'stocket-hooks'
import { getStock } from 'stocket-api'
import { Container, Text } from 'stocket-components'
import { SearchIcon } from 'stocket-icons'

export default function SearchSymbol() {
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
    <Container noPh>
      <View style={styles.searchContainer}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
          placeholder="Symbol e.g AAPL"
          placeholderTextColor="#afafaf"
          autoCapitalize="characters"
        />

        <TouchableOpacity style={styles.searchBtn} onPress={getStockData}>
          <SearchIcon size={30} />
        </TouchableOpacity>
      </View>

      {loading && <Text>Loading...</Text>}

      {data && (
        <Container horizontal separate>
          <View>
            <Text type="title">{data?.symbol}</Text>
            <Text>{data?.name}</Text>
          </View>
          <View>
            <Text type="title">${data?.price}</Text>
          </View>
        </Container>
      )}
    </Container>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#3F3F3F',
    width: '100%',
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchInput: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Futura',
    flex: 1,
    letterSpacing: -0.3,
  },
  searchBtn: {
    paddingVertical: 3,
    paddingHorizontal: 3,
  },
})
