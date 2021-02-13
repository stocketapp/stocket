import { ApolloClient, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import auth from '@react-native-firebase/auth'
import { STOCKET_API_URL } from '../config'
import cache from './Cache'

const httpLink = createHttpLink({
  uri: STOCKET_API_URL,
})

const authLink = setContext(async (_, { headers }) => {
  const result = await auth().currentUser?.getIdTokenResult()
  return {
    headers: {
      ...headers,
      authorization: result?.token ?? '',
    },
  }
})

const link = authLink.concat(httpLink)

const client = new ApolloClient({
  link,
  cache,
})

export default client
