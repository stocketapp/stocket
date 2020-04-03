import React, { useRef, useState } from 'react'
import { PanResponder, View } from 'react-native'
import { LineChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { GREEN } from 'utils/colors'
import VerticalIndicator from './VerticalIndicator'
import DataLabel from './DataLabel'
import { PanGestureHandler, State } from 'react-native-gesture-handler'

// const HorizontalLine = ({ y }) => (
//   <Line
//     key={'zero-axis'}
//     x1={'0%'}
//     x2={'100%'}
//     y1={y(50)}
//     y2={y(50)}
//     stroke={'grey'}
//     strokeDasharray={[4, 8]}
//     strokeWidth={2}
//   />
// )

export default function StockGraph({ data }) {
  const [positionX, setPositionX] = useState(0)
  const [positionY, setPositionY] = useState(0)
  const [showLine, setShowLine] = useState(false)
  const [yValue, setYValue] = useState(0)
  const [xValue, setXValue] = useState(0)
  const handlerRef = useRef()

  // const panResponder = useRef(
  //   PanResponder.create({
  //     onMoveShouldSetPanResponder: () => true,
  //     onPanResponderGrant: (e, state) => {
  //       setPositionX(state.moveX)
  //       setPositionY(state.moveY)
  //       setShowLine(true)
  //     },
  //     onPanResponderMove: (e, state) => {
  //       setPositionX(state.moveX)
  //       setPositionY(state.moveY)
  //     },
  //     onPanResponderRelease: () => {
  //       setShowLine(false)
  //     },
  //   }),
  // ).current

  const setYAccessor = ({ item, ...rest }) => {
    setYValue(item)
    return item.value
  }

  const setXAccessor = ({ index, ...rest }) => {
    setXValue(index)
    return index
  }

  const onGestureEvent = ({ nativeEvent }) => {
    const { state } = nativeEvent
    // console.log(nativeEvent)
    if (state === State.BEGAN || state === State.ACTIVE) {
      setPositionX(nativeEvent.x)
    }
  }

  const onHandlerStateChange = ({ nativeEvent }) => {
    const { state } = nativeEvent
    if (state === State.ACTIVE) {
      setTimeout(() => {
        setShowLine(true)
      }, 100)
    } else {
      setShowLine(false)
    }
  }

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
      ref={handlerRef}
    >
      <View>
        <LineChart
          style={{ height: 320 }}
          data={data}
          svg={{
            stroke: GREEN,
            strokeWidth: 2,
          }}
          contentInset={{ top: 70, bottom: 20 }}
          curve={shape.curveNatural}
          yAccessor={setYAccessor}
          xAccessor={setXAccessor}
        >
          {/* <HorizontalLine /> */}
          {showLine && (
            <DataLabel
              positionX={positionX}
              positionY={positionY}
              yValue={yValue}
              xValue={xValue}
            />
          )}
          {showLine && (
            <VerticalIndicator
              positionX={positionX}
              xValue={xValue}
              yValue={yValue}
            />
          )}
        </LineChart>
      </View>
    </PanGestureHandler>
  )
}
