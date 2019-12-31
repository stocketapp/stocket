// @flow
import React from 'react'
import LottieView from 'lottie-react-native'

const Loader = ({ size = 50 }: { size?: number }) => (
  <LottieView
    source={require('../../assets/lottie/loading.json')}
    style={{ height: size, width: size }}
    autoPlay
    loop
  />
)

export default Loader
