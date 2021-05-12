import { gql } from '@apollo/client'

export const SYMBOL_QUOTE_QUERY = gql`
  query($symbol: String!) {
    quote(symbol: $symbol) {
      symbol
      close
      companyName
      open
      high
      low
      iexVolume
      marketCap
      peRatio
      week52High
      week52Low
      changePercent
      changePercentS
      change
      latestPrice
      logo
    }
  }
`

export const SYMBOL_CHART_QUERY = gql`
  query($symbol: String!) {
    chart(symbol: $symbol) {
      close
      label
      date
      changeOverTime
      changeOverTimeS
    }
  }
`
