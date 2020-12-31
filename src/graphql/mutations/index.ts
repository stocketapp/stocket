import useCreateUser from './useCreateUserMutation'
import useAddToWatchlist from './useAddToWatchlist'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { FetchResult } from '@apollo/client'

type Result = Promise<FetchResult<any, Record<string, any>, Record<string, any>>>
interface StocketMutations {
  useCreateUser: (user: FirebaseAuthTypes.User) => Result
  addToWatchlist: (symbol: string) => Result
}

const stocketMutations = {
  useCreateUser,
  useAddToWatchlist,
}

export default stocketMutations
