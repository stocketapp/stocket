import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withTiming,
} from 'react-native-reanimated'
import { StyleSheet, View } from 'react-native'
import { getYForX, parse } from 'react-native-redash'

export default function ChartCursor({ d, y }: CursorProps) {
  const path = parse(d)
  const x = useSharedValue(0)
  const active = useSharedValue(false)
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      active.value = true
    },
    onActive: event => {
      x.value = event.x
      y.value = getYForX(path, x.value) ?? 0
    },
    onEnd: () => {
      active.value = false
    },
  })
  const style = useAnimatedStyle(() => {
    const translateX = x.value - 50 / 2
    // @ts-ignore
    const translateY = y.value - 50 / 2
    return {
      transform: [{ translateX }, { translateY }],
      opacity: withTiming(active.value ? 1 : 0),
    }
  })
  return (
    <PanGestureHandler onHandlerStateChange={onGestureEvent} {...{ onGestureEvent }}>
      <Animated.View style={StyleSheet.absoluteFill}>
        <Animated.View style={[styles.cursor, style]}>
          <View style={styles.cursorBody} />
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  )
}

const styles = StyleSheet.create({
  cursorBody: {
    height: 15,
    width: 15,
    backgroundColor: 'white',
    borderRadius: 7.5,
  },
  cursor: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
})

interface CursorProps {
  d: string
  y: Animated.SharedValue<number>
}
