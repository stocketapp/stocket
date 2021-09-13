import { useState, useEffect, useCallback } from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import { GREEN, LABEL } from '@utils/colors'
import { dotStyles, containerStyles } from './styles'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

interface Props {
  label?: string
}

const MarketStatus = ({ label }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false)
  // TODO: use dynamic market status
  const statusLabel = `Market is ${true ? 'open' : 'closed'}` ?? label
  const expanded = useSharedValue(32)
  const textWidth = useSharedValue(0)
  const opacity = useSharedValue(0)
  const expandedStyles = useAnimatedStyle(() => ({
    width: expanded.value,
  }))
  const textStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
    width: textWidth.value,
  }))

  const expand = useCallback(() => {
    setIsExpanded(!isExpanded)
    if (isExpanded) {
      expanded.value = widthWithTiming(32)
      opacity.value = opacityWithTiming(0)
      textWidth.value = widthWithTiming(0)
    } else {
      expanded.value = widthWithTiming(122)
      opacity.value = opacityWithTiming(0.8)
      textWidth.value = widthWithTiming(85)
    }
  }, [isExpanded, expanded, opacity, textWidth])

  const opacityWithTiming = (value: number) => {
    return withTiming(value, { duration: 800 })
  }

  const widthWithTiming = (value: number) => {
    return withTiming(value, { duration: 450 })
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout // eslint-disable-line no-undef
    if (isExpanded) {
      timeout = setTimeout(() => expand(), 2500)
    }

    return () => clearTimeout(timeout)
  }, [expand, isExpanded])

  return (
    <TouchableWithoutFeedback onPress={() => expand()} disabled={isExpanded}>
      <Animated.View style={[containerStyles, expandedStyles]}>
        <Animated.Text
          numberOfLines={1}
          style={[
            { fontSize: 12, marginRight: isExpanded ? 5 : 0, color: 'white' },
            textStyles,
          ]}
        >
          {statusLabel}
        </Animated.Text>
        <View style={{ ...dotStyles, backgroundColor: true ? GREEN : LABEL }} />
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

export default MarketStatus
