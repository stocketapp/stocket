import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Text } from 'components'
import auth from '@react-native-firebase/auth'

export default function () {
  const signout = async () => {
    await auth().signOut()
  }

  return (
    <TouchableOpacity onPress={signout}>
      <Text status="negative" weight="Black">
        LOG OUT
      </Text>
    </TouchableOpacity>
  )
}
