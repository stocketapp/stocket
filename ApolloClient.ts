import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import auth from '@react-native-firebase/auth'

const httpLink = createHttpLink({
  uri: 'localhost:3000/graphql',
})

const authLink = setContext(async (_, { headers }) => {
  const token = await auth().currentUser?.getIdTokenResult()
  return {
    headers: {
      ...headers,
      authorization: token ?? '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default client
