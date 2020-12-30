import useCreateUserMutation from './useCreateUserMutation'
import useAddToWatchlist from './useAddToWatchlist'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'

interface StocketMutations {
  createUser: (user: FirebaseAuthTypes.User) => void
  useAddToWatchlist: (symbol: string) => void
}

const stocketMutations: StocketMutations = {
  createUser: useCreateUserMutation,
  useAddToWatchlist: useAddToWatchlist,
}

export default stocketMutations
