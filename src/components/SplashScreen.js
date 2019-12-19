import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'

export default function SplashScreen({ navigation }) {
  const { isAuth } = useSelector(({ user }) => user)

  const container = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }

  useEffect(() => {
    console.log(isAuth)
    const timer = setTimeout(() => {
      navigation.navigate(!isAuth ? 'AuthStack' : 'MainStack')
    }, 2000)

    return () => clearTimeout(timer)
  }, [isAuth])

  return (
    <View style={container}>
      <Text>Stocket</Text>
    </View>
  )
}
