import { useCallback, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import Animated, { useSharedValue, withDelay, withTiming } from 'react-native-reanimated'
import { useTheme } from '@emotion/react'
import { SearchIcon } from '@icons'
import SearchResults from './SearchResults'
import { SearchResultType } from 'types'
import { searchInputStyles, searchInputContainerStyle } from './styles'

const SearchSymbol = ({ value, setValue, data }: SearchSymbolsProps) => {
  const theme = useTheme()
  const resultsHeight = useSharedValue(0)
  const resultsPadding = useSharedValue(0)
  const [isFocused, setIsFocused] = useState(false)
  const display = useSharedValue(0)

  const toggle = useCallback((toggleValue: boolean) => {
    setIsFocused(toggleValue)
  }, [])

  const close = useCallback(() => {
    resultsPadding.value = 0
    resultsHeight.value = 0
    display.value = withDelay(100, withTiming(0))
  }, [display, resultsHeight, resultsPadding])

  useEffect(() => {
    if (!isFocused || value === '') {
      close()
    } else if (data.length > 0 && isFocused) {
      resultsPadding.value = 20
      resultsHeight.value = 400
      display.value = 1
    }
  }, [resultsPadding, isFocused, resultsHeight, display, data.length, close, value])

  return (
    <View
      style={{
        width: '100%',
        alignItems: 'flex-end',
        zIndex: 1,
      }}
    >
      <View style={searchInputContainerStyle}>
        <Animated.View style={{ flex: 3 }}>
          <TextInput
            value={value ?? ''}
            onChangeText={text => setValue(text)}
            style={searchInputStyles}
            placeholder="Symbol or company name"
            placeholderTextColor={theme.colors.GRAY}
            autoCapitalize="characters"
            returnKeyType="search"
            onBlur={() => toggle(false)}
            onFocus={() => toggle(true)}
          />
        </Animated.View>

        <TouchableOpacity>
          <SearchIcon size={28} color={theme.colors.WHITE} />
        </TouchableOpacity>
      </View>

      <SearchResults
        data={data}
        height={resultsHeight}
        padding={resultsPadding}
        display={display}
      />
    </View>
  )
}

export default SearchSymbol

export interface SearchSymbolsProps {
  value: string | null
  setValue: Dispatch<SetStateAction<string>>
  onSearch?: () => void
  data: SearchResultType[]
}
