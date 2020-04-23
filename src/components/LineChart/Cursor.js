import React from 'react'
import { Dimensions } from 'react-native'
import { getPointAtLength, parsePath } from 'react-native-redash'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { event, interpolate, sub } from 'react-native-reanimated'
import { GREEN, SUB_BACKGROUND } from 'utils/colors'

const { Value } = Animated
const { width } = Dimensions.get('window')

export default ({ d, scaleY, scaleX, data }) => {
  const translationX = new Value(0)
  const path = parsePath(d)
  const length = interpolate(translationX, {
    inputRange: [0, width],
    outputRange: [0, path.totalLength],
  })
  const { x, y } = getPointAtLength(path, length)
  const translateX = x
  const cursorX = sub(x, 4)
  const cursorY = sub(y, 4)
  const text = scaleY.invert(cursorX.__getValue())
  const onGestureEvent = event([
    {
      nativeEvent: {
        x: translationX,
      },
    },
  ])

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View>
        <Animated.View style={{ transform: [{ translateX }], ...styles.label }}>
          <Animated.Text style={{ color: 'white' }}>{text}</Animated.Text>
        </Animated.View>
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
    height: '96%',
    width: 2,
    backgroundColor: SUB_BACKGROUND,
    top: '4%',
  },
  cursor: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: GREEN,
    position: 'absolute',
  },
  label: {
    position: 'absolute',
    top: -12,
    left: 0,
    width: 100,
  },
}
