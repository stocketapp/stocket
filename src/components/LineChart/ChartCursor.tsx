import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withTiming,
} from 'react-native-reanimated'
import { StyleSheet, View } from 'react-native'
import { getYForX, parse, Vector } from 'react-native-redash'

export default function ChartCursor({ d, translation, active }: CursorProps) {
  const path = parse(d)
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      active.value = true
    },
    onActive: event => {
      translation.x.value = event.x
      translation.y.value = getYForX(path, translation.x.value) ?? 0
    },
    onEnd: () => {
      active.value = false
    },
  })
  const style = useAnimatedStyle(() => {
    const translateX = translation.x.value - 50 / 2
    const translateY = translation.y.value - 50 / 2
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
  translation: Vector<Animated.SharedValue<number>>
  active: Animated.SharedValue<boolean>
}
