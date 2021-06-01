import { gql } from '@apollo/client'
import { useRefetchQuery } from '@hooks'

export default function useBalance() {
  const { data, error, loading } = useRefetchQuery(GET_BALANCE_QUERY)

  return { data: data?.user, error, loading }
}

const GET_BALANCE_QUERY = gql`
  query {
    user {
      portfolioValue
      cash
    }
  }
`
