import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client'

const GET_USER_QUERY = gql`
  query GetUser {
    getUser {
      userInfo {
        cash
        portfolioValue
        portfolioChangePct
        portfolioChange
        apnsToken
      }
      id
      uid
      email
      displayName
    }
  }
`

export default function useGetUser() {
  return useQuery(GET_USER_QUERY)
}
