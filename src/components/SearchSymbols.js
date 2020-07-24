import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import Container from './Container'
import { SearchIcon } from 'icons'
import type { SearchSymbolProps } from 'types'
import { SUB_BACKGROUND, GRAY_DARKER } from 'utils/colors'

const SearchSymbol = (props: SearchSymbolProps): React$Node => {
  const { value, setValue, onSearch } = props
  return (
    <Container top={20} bottom={10}>
      <View style={styles.searchContainer}>
        <TextInput
          value={value}
          onChangeText={setValue}
          style={styles.searchInput}
          placeholder="Search company symbol or name"
          placeholderTextColor={GRAY_DARKER}
          autoCapitalize="words"
          returnKeyType="search"
          onSubmitEditing={({ text }) => onSearch(text)}
        />

        <TouchableOpacity style={styles.searchBtn} onPress={onSearch} disabled>
          <SearchIcon size={30} />
        </TouchableOpacity>
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    paddingVertical: 3,
    paddingHorizontal: 18,
    backgroundColor: SUB_BACKGROUND, // '#3F3F3F',
    width: '100%',
    borderRadius: 1000,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchInput: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  searchBtn: {
    paddingVertical: 3,
    paddingHorizontal: 3,
  },
})

export default SearchSymbol
