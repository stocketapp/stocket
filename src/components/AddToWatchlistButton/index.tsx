import { IEXQuote } from 'types'
import { remove, includes } from 'lodash'
import { WatchlistIexQuote } from 'views/Home/Watchlist/WatchlistItem'
import { useStocketMutation } from '@hooks'
import { gql } from '@apollo/client'

const AddToWatchlistButton = ({ symbol = '' }: SearchResultProps) => {
  const { useCallback } = require('react')
  const { TouchableOpacity } = require('react-native')
  const FavoriteIcon = require('../Icons/FavoriteIcon').default
  const { GREEN } = require('@utils/colors')
  const { useTheme } = require('@emotion/react')
  const { useReactiveVar } = require('@apollo/client')
  const { watchlistSymbolsVar, watchlistQuotesVar } = require('@cache')

  const { p } = useTheme()
  const addToWatchlistMutate = useStocketMutation<AddToWatchlistType>(ADD)
  const removeFromWatchlistMutate = useStocketMutation<RemoveFromWatchlistType>(REMOVE)
  const watchlistSymbols = useReactiveVar(watchlistSymbolsVar)
  const watchlistQuotes = useReactiveVar(watchlistQuotesVar)

  const isFaved = useCallback(
    (sym: string): boolean => includes(watchlistSymbols, sym),
    [watchlistSymbols],
  )

  const addToWatchlistSymbolsCache = useCallback(
    (newValue: string) => {
      watchlistSymbolsVar([...(watchlistSymbols ?? []), newValue])
    },
    [watchlistSymbols, watchlistSymbolsVar],
  )

  const removeFromWatchlistCache = () => {
    watchlistSymbolsVar(remove(watchlistSymbols, (el: string) => el !== symbol))
    watchlistQuotesVar(remove(watchlistQuotes, (el: IEXQuote) => el.symbol !== symbol))
  }

  const toggleFromWatchlist = async () => {
    if (!isFaved(symbol)) {
      const { data } = await addToWatchlistMutate({ symbol }, () =>
        addToWatchlistSymbolsCache(symbol),
      )
      watchlistQuotesVar([...(watchlistQuotesVar() ?? []), data?.addToWatchlist])
    } else {
      await removeFromWatchlistMutate({ symbol }, () => removeFromWatchlistCache())
    }
  }

  return (
    <TouchableOpacity style={{ padding: p.sm }} onPress={toggleFromWatchlist}>
      <FavoriteIcon size={26} color={GREEN} filled={isFaved(symbol)} />
    </TouchableOpacity>
  )
}

interface SearchResultProps {
  symbol: string
}

interface AddToWatchlistType {
  addToWatchlist: WatchlistIexQuote
}

interface RemoveFromWatchlistType {
  removeFromWatchlist: {
    symbol: string
  }
}

export const ADD = gql`
  mutation ($input: AddToWatchlistInput!) {
    addToWatchlist(input: $input) {
      symbol
      symbol
      change
      changePercent
      companyName
      latestPrice
      id
      logo
    }
  }
`

export const REMOVE = gql`
  mutation ($input: RemoveFromWatchlistInput!) {
    removeFromWatchlist(input: $input) {
      symbol
    }
  }
`

export default AddToWatchlistButton
