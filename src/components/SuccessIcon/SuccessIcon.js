// @flow
import React from 'react'
import { View } from 'react-native'
import LottieView from 'lottie-react-native'

const Success = ({ size = 50 }: { size?: number }) => (
  <LottieView
    source={require('../../assets/lottie/success.json')}
    style={{ height: size, width: size }}
    autoPlay
    loop
  />
)

export default function SuccessScreen() {
  return (
    <View>
      <Success />
    </View>
  )
}
