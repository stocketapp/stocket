import { TouchableOpacity } from 'react-native'
import { Text } from '@components'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'

export default function () {
  const { navigate } = useNavigation()

  const signout = async () => {
    navigate('Home')
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
