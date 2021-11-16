import { Dispatch, SetStateAction, useState } from 'react'
import { LayoutChangeEvent, StyleProp, TextInputProps, ViewStyle } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import { InputContainer, CustomInput, animatedLineStyles } from './styles'

export default function Input({ value, setValue, containerStyle, ...props }: InputProps) {
  const [lineWidth, setLineWidth] = useState<number>(0)
  const animatedWidth = useSharedValue(0)
  const moveLeft = useSharedValue(150)

  const setWidth = (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout
    setLineWidth(width)
  }

  const setAnimatedWidth = (newWidth: number, newPosition: number) => {
    animatedWidth.value = newWidth
    moveLeft.value = newPosition
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(moveLeft.value) }],
    width: withTiming(animatedWidth.value),
  }))

  return (
    <InputContainer style={containerStyle}>
      <CustomInput
        value={value}
        onChangeText={setValue}
        onFocus={() => setAnimatedWidth(lineWidth, 0)}
        onBlur={() => setAnimatedWidth(0, lineWidth / 2)}
        onLayout={setWidth}
        placeholderTextColor="#ffffff1F"
        {...props}
      />
      <Animated.View style={[animatedLineStyles, animatedStyle]} />
    </InputContainer>
  )
}

interface InputProps extends TextInputProps {
  value: string
  setValue: Dispatch<SetStateAction<string>>
  containerStyle?: StyleProp<ViewStyle>
}
