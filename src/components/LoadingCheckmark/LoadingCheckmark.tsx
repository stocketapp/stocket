import { forwardRef } from 'react'
import * as React from 'react'
import LottieView from 'lottie-react-native'

interface Props {
  size: number
  forwardedRef: any
  loop: boolean
}

const LoadingCheckmark: React.FC<Props> = ({ size = 50, forwardedRef, loop }) => (
  <LottieView
    source={require('../../assets/lottie/loading-checkmark.json')}
    style={{ height: size, width: size }}
    loop={loop}
    ref={forwardedRef}
  />
)

export default forwardRef((props: Props, ref: any) => (
  <LoadingCheckmark {...props} forwardedRef={ref} />
))
