import { remove, includes } from 'lodash'
import { WatchlistIexQuote } from 'views/Home/Watchlist/WatchlistItem'
import { useStocketMutation } from '@hooks'
import { gql, useReactiveVar } from '@apollo/client'
import { useCallback } from 'react'
import { TouchableOpacity } from 'react-native'
import { useTheme } from '@emotion/react'
import { watchlistSymbolsVar, watchlistQuotesVar } from '@cache'
import FavoriteIcon from '../Icons/FavoriteIcon'

const AddToWatchlistButton = ({ symbol = '' }: SearchResultProps) => {
  const { p, colors } = useTheme()
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
    [watchlistSymbols],
  )

  const removeFromWatchlistCache = () => {
    watchlistSymbolsVar(remove(watchlistSymbols, (el: string) => el !== symbol))
    watchlistQuotesVar(
      remove(watchlistQuotes, (el: WatchlistIexQuote) => el.symbol !== symbol),
    )
  }

  const toggleFromWatchlist = async () => {
    if (!isFaved(symbol)) {
      const { data } = await addToWatchlistMutate({ symbol }, () =>
        addToWatchlistSymbolsCache(symbol),
      )
      watchlistQuotesVar([...watchlistQuotesVar(), data?.addToWatchlist])
    } else {
      await removeFromWatchlistMutate({ symbol }, () => removeFromWatchlistCache())
    }
  }

  return (
    <TouchableOpacity style={{ padding: p.sm }} onPress={toggleFromWatchlist}>
      <FavoriteIcon size={26} color={colors.GREEN} filled={isFaved(symbol)} />
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
