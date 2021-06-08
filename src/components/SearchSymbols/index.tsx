import * as React from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import Container from '../Container'
import { SearchIcon } from '@icons'
import type { SearchSymbolsProps as Props } from 'types'
import { GRAY_DARKER } from '@utils/colors'
import styles from './styles'

const SearchSymbol: React.FC<Props> = ({ value, setValue, onSearch }) => (
  <Container top={20} bottom={10}>
    <View style={styles.searchContainer}>
      <TextInput
        value={value ?? ''}
        onChangeText={text => setValue(text)}
        style={styles.searchInput}
        placeholder="Symbol or company name"
        placeholderTextColor={GRAY_DARKER}
        autoCapitalize="characters"
        returnKeyType="search"
      />

      <TouchableOpacity style={styles.searchBtn} onPress={onSearch} disabled>
        <SearchIcon size={32} color={GRAY_DARKER} />
      </TouchableOpacity>
    </View>
  </Container>
)

export default SearchSymbol
