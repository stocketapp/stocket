import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import RNBootSplash from 'react-native-bootsplash'

export default function SplashScreen({ navigation }) {
  const { isAuth } = useSelector(({ user }) => user)

  const container = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }

  useEffect(() => {
    async function redirect() {
      navigation.navigate(!isAuth ? 'AuthStack' : 'MainStack')
    }
    console.log(isAuth)

    redirect().finally(() => RNBootSplash.hide({ duration: 250 }))
    // const timer = setTimeout(() => {
    // }, 2000)

    // return () => clearTimeout(timer)
  }, [isAuth, navigation])

  return (
    <View style={container}>
      <Text>Stocket</Text>
    </View>
  )
}
