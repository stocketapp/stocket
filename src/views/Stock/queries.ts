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
    intraday(symbol: $symbol) {
      label
      close
      date
      changePercent
      changeOverTime
      changePercentS
    }
  }
`

export const CREATE_TRADE_MUTATION = gql`
  mutation($input: CreateTradeInput!) {
    createTrade(input: $input) {
      symbol
      price
      size
      orderType
      total
    }
  }
`
