import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client'

export default function useNews(symbol: string) {
  const result = useQuery<NewsQuery>(NEWS_QUERY, { variables: { symbol } })

  return { ...result, data: result?.data?.news }
}

type NewsQuery = {
  news: NewsType[]
}

export interface NewsType {
  headline: string
  source: string
  url: string
  summary: string
  image: string
  dateTime: string
}

const NEWS_QUERY = gql`
  query ($symbol: String!) {
    news(symbol: $symbol) {
      headline
      source
      url
      summary
      image
      datetime
    }
  }
`
