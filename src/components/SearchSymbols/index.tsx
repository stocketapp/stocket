import { View, TextInput, TouchableOpacity, useWindowDimensions } from 'react-native'
import { SearchIcon } from '@icons'
import type { SearchSymbolsProps } from 'types'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { searchInputStyles, searchInputContainerStyle } from './styles'
import { useTheme } from '@emotion/react'
import { useIsFocused } from '@react-navigation/native'
import { useEffect, useCallback } from 'react'

const SearchSymbol = ({ value, setValue }: SearchSymbolsProps) => {
  const window = useWindowDimensions()
  const width = useSharedValue(50)
  const theme = useTheme()
  const active = useSharedValue(false)
  const inputWidth = useSharedValue('0%')
  const containerPadding = useSharedValue(10)
  const justifyContent = useSharedValue('flex-end')
  const inputDisplay = useSharedValue<'flex' | 'none'>('none')
  const isFocused = useIsFocused()

  const containerStyle = useAnimatedStyle(() => ({
    width: withSpring(width.value, { damping: 10, mass: 0.5, stiffness: 50 }),
    justifyContent: withTiming(justifyContent.value, { duration: 400 }),
    paddingHorizontal: withTiming(containerPadding.value, { duration: 400 }),
  }))
  const inputStyle = useAnimatedStyle(() => ({
    display: inputDisplay.value,
    width: withTiming(inputWidth.value, { duration: 400 }),
  }))

  const close = useCallback(() => {
    active.value = false
    width.value = 50
    inputWidth.value = '0%'
    containerPadding.value = 10
    justifyContent.value = 'flex-end'
    inputDisplay.value = 'none'
  }, [active, containerPadding, inputDisplay, inputWidth, justifyContent, width])
  const open = useCallback(() => {
    active.value = true
    width.value = window.width - 36
    inputWidth.value = '90%'
    containerPadding.value = 16
    justifyContent.value = 'space-between'
    inputDisplay.value = 'flex'
  }, [
    active,
    containerPadding,
    inputDisplay,
    inputWidth,
    justifyContent,
    width,
    window.width,
  ])

  const toggleActive = () => {
    if (width.value !== 50) {
      close()
    } else {
      open()
    }
  }

  useEffect(() => {
    if (value && isFocused) {
      open()
    }
  }, [isFocused, open, value])

  return (
    <View style={{ width: '100%', height: 50, alignItems: 'flex-end', zIndex: 10 }}>
      <Animated.View style={[containerStyle, searchInputContainerStyle]}>
        <Animated.View style={inputStyle}>
          <TextInput
            value={value ?? ''}
            onChangeText={text => setValue(text)}
            style={searchInputStyles}
            placeholder="Symbol or company name"
            placeholderTextColor={theme.colors.GRAY}
            autoCapitalize="characters"
            returnKeyType="search"
            onBlur={close}
          />
        </Animated.View>

        <TouchableOpacity onPress={toggleActive}>
          <SearchIcon size={28} color={theme.colors.WHITE} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

export default SearchSymbol
