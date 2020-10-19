import auth from '@react-native-firebase/auth'
import { createUserData } from '@api'
import firestore from '@react-native-firebase/firestore'
import { AppleRequestResponseFullName } from '@invertase/react-native-apple-authentication'

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

const FR = firestore()
export default async function createUser(name: CreateUserName) {
  const currentUser = auth().currentUser
  const displayName = `${name?.givenName} ${name?.familyName}`

  try {
    const user = await FR.doc(`Users/${currentUser?.uid}`).get()
    const userExists = user.exists
    if (!userExists) {
      await createUserData({
        uid: currentUser?.uid,
        name: displayName,
        email: currentUser?.email,
      })
      await currentUser?.updateProfile({ displayName })
    }
  } catch (err) {
    console.log(err)
  }
}
