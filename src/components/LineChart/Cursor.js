import React from 'react'
import { Dimensions } from 'react-native'
import { getPointAtLength, parsePath } from 'react-native-redash'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated, {
  event,
  interpolate,
  sub,
  decay,
} from 'react-native-reanimated'
import { GREEN, SUB_BACKGROUND } from 'utils/colors'
import { scaleQuantile } from 'd3-scale'

const { Value } = Animated
const { width } = Dimensions.get('window')

export default ({ d, scaleY }) => {
  const translationX = new Value(0)
  const velocityX = new Value(0)
  const state = new Value(State.UNDETERMINED)
  const onGestureEvent = event([
    {
      nativeEvent: {
        x: translationX,
        velocityX,
        state,
      },
    },
  ])
  const path = parsePath(d)
  const length = interpolate(translationX, {
    inputRange: [0, width],
    outputRange: [0, path.totalLength],
  })
  const { x, y } = getPointAtLength(path, length)
  const translateX = sub(x, 5)
  const cursorX = sub(x, 8)
  const cursorY = sub(y, 4)

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onGestureEvent}
    >
      <Animated.View>
        <Animated.View style={[styles.line, { transform: [{ translateX }] }]} />
        <Animated.View
          style={[
            styles.cursor,
            { transform: [{ translateX: cursorX, translateY: cursorY }] },
          ]}
        />
      </Animated.View>
    </PanGestureHandler>
  )
}

const styles = {
  line: {
    height: '100%',
    width: 2,
    backgroundColor: SUB_BACKGROUND,
  },
  cursor: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: GREEN,
    position: 'absolute',
  },
}
