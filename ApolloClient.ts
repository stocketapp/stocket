import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import auth from '@react-native-firebase/auth'
import { STOCKET_API_URL } from './config'

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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default client
