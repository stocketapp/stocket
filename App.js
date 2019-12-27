/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import switchNavigator from 'navigation'
import { useAuthState } from 'stocket-hooks'
import { createAppContainer } from 'react-navigation'
import RNBootSplash from 'react-native-bootsplash'
import { BLACK } from 'utils/colors'
import firestore from '@react-native-firebase/firestore'

export default function App(): React$Node {
  const { isAuth, currentUser } = useAuthState()

  useEffect(() => {
    async function getUserInfo() {
      try {
        if (currentUser?.uid) {
          const info = await firestore()
            .collection('Users')
            .doc(currentUser?.uid)
            .get()
          console.log('INFO', info.data())
        }
      } catch (err) {
        console.log(err)
      } finally {
        RNBootSplash.hide({ duration: 250 })
      }
    }

    getUserInfo()
  }, [currentUser])

  const navigator = switchNavigator(!isAuth ? 'AuthStack' : 'MainStack')
  const NavigationRoutes = createAppContainer(navigator)

  const container = {
    flex: 1,
    backgroundColor: BLACK,
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={container}>
        <NavigationRoutes />
      </SafeAreaView>
    </>
  )
}
