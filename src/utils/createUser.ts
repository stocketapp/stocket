import auth from '@react-native-firebase/auth'
import { AppleRequestResponseFullName } from '@invertase/react-native-apple-authentication'
import crashlytics from '@react-native-firebase/crashlytics'

type CreateUserName =
  | {
      id: string
      name: string | null
      email: string
      photo: string | null
      familyName: string | null
      givenName: string | null
    }
  | AppleRequestResponseFullName
  | null

export default async function createUser(name: CreateUserName) {
  const currentUser = auth().currentUser
  const displayName = `${name?.givenName} ${name?.familyName}`

  try {
    if (currentUser) {
      await currentUser?.updateProfile({ displayName })
      crashlytics().log('Created user')
      crashlytics().setUserId(currentUser?.uid ?? '')
    }
  } catch (err) {
    console.log(err)
  }
}
