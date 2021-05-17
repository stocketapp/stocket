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
  const statusLabel = `Market ${true ? 'open' : 'closed'}` ?? label
  const expanded = useSharedValue(32)
  const textWidth = useSharedValue(0)
  const opacity = useSharedValue(0)
  const expandedStyles = useAnimatedStyle(() => ({
    width: withTiming(expanded.value, { duration: 450 }),
  }))
  const textStyles = useAnimatedStyle(() => ({
    opacity: withTiming(opacity.value, { duration: 800 }),
    width: withTiming(textWidth.value, { duration: 450 }),
  }))

  const expand = useCallback(() => {
    setIsExpanded(!isExpanded)
    if (isExpanded) {
      expanded.value = 32
      opacity.value = 0
      textWidth.value = 0
    } else {
      expanded.value = 120
      opacity.value = 0.8
      textWidth.value = 71
    }
  }, [expanded, opacity, textWidth, isExpanded])

  useEffect(() => {
    let timeout: NodeJS.Timeout
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
