// @flow
import React, { forwardRef } from 'react'
import LottieView from 'lottie-react-native'

type Props = {
  size: number,
  ref: any,
  loop: boolean,
}

const LoadingCheckmark = ({ size = 50, ref, loop }: Props) => (
  <LottieView
    source={require('../../assets/lottie/loading_checkmark.json')}
    style={{ height: size, width: size }}
    autoPlay
    loop={loop}
    ref={ref}
  />
)

export default forwardRef<Props, React$Node>((props, ref) =>
  LoadingCheckmark({ ref, ...props }),
)
