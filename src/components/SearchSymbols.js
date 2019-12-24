import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import Container from './Container'
import { SearchIcon } from 'stocket-icons'
import type { SearchSymbolProps } from 'ComponentsTypes'

const SearchSymbol = (props: SearchSymbolProps): React$Node => {
  const { value, setValue, onSearch } = props
  return (
    <Container noPh>
      <View style={styles.searchContainer}>
        <TextInput
          value={value}
          onChangeText={setValue}
          style={styles.searchInput}
          placeholder="Symbol e.g AAPL"
          placeholderTextColor="#afafaf"
          autoCapitalize="characters"
        />

        <TouchableOpacity style={styles.searchBtn} onPress={onSearch}>
          <SearchIcon size={30} />
        </TouchableOpacity>
      </View>
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

export default SearchSymbol
