import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client'

export default function useList() {
  const gainers = useQuery(LIST_QUERY, {
    variables: { listType: 'gainers' },
  })
  const losers = useQuery(LIST_QUERY, {
    variables: { listType: 'losers' },
  })

  return { gainers, losers }
}

const LIST_QUERY = gql`
  query ($listType: String!) {
    list(listType: $listType) {
      symbol
      latestPrice
      changePercent
      logo
    }
  }
`
