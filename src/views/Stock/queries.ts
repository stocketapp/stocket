import { gql } from '@apollo/client'

export const SYMBOL_QUOTE_QUERY = gql`
  query ($symbol: String!) {
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
  query ($symbol: String!) {
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
  mutation ($input: CreateTradeInput!) {
    createTrade(input: $input) {
      symbol
      price
      size
      orderType
      total
    }
  }
`

export const GET_POSITION = gql`
  query ($symbol: String!) {
    position(symbol: $symbol) {
      symbol
      avgPrice
      totalGains
      totalValue
      change24h
      change24hPct
      size
    }
  }
`

export const GET_COMPANY = gql`
  query ($symbol: String!) {
    company(symbol: $symbol) {
      symbol
      companyName
      description
      website
      ceo
      logo
    }
  }
`
export const GET_KEY_STATS = gql`
  query ($symbol: String!) {
    stats(symbol: $symbol) {
      companyName
      marketCap
      week52Low
      week52High
      week52Change
      avg10Volume
      ttmEps
      peRatio
      dividendYield
      ttmDividendRate
      ytdChangePercent
      nextDividendDate
      nextEarningsDate
    }
  }
`
