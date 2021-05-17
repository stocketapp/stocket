import { Dispatch, SetStateAction, useState } from 'react'
import { InputContainer, CustomInput, animatedLineStyles } from './styles'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import { LayoutChangeEvent } from 'react-native'

export default function Input({ value, setValue }: InputProps) {
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
    <InputContainer>
      <CustomInput
        value={value}
        onChangeText={setValue}
        onFocus={() => setAnimatedWidth(lineWidth, 0)}
        onBlur={() => setAnimatedWidth(0, lineWidth / 2)}
        onLayout={setWidth}
      />
      <Animated.View style={[animatedLineStyles, animatedStyle]} />
    </InputContainer>
  )
}

interface InputProps {
  value: string
  setValue: Dispatch<SetStateAction<string>>
}
