import React from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import Container from '../Container'
import { SearchIcon } from '@icons'
import type { SearchSymbolsProps } from 'types'
import { GRAY_DARKER } from '@utils/colors'
import styles from './styles'

const SearchSymbol: React.FC<SearchSymbolsProps> = ({
  value,
  setValue,
  onSearch,
}) => (
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
      />

      <TouchableOpacity style={styles.searchBtn} onPress={onSearch} disabled>
        <SearchIcon size={28} />
      </TouchableOpacity>
    </View>
  </Container>
)

export default SearchSymbol
