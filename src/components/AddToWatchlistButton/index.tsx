import { IEXQuote } from 'types'
import { remove, includes } from 'lodash'

const AddToWatchlistButton = ({ symbol = '' }: SearchResultProps) => {
  const { useCallback } = require('react')
  const { TouchableOpacity } = require('react-native')
  const FavoriteIcon = require('../Icons/FavoriteIcon').default
  const { GREEN } = require('@utils/colors')
  const { useTheme } = require('@emotion/react')
  const { ADD_TO_WATCHLIST, REMOVE_FROM_WATCHLIST } = require('@mutations')
  const { useReactiveVar } = require('@apollo/client')
  const { watchlistSymbolsVar, watchlistQuotesVar } = require('@cache')
  const { useStocketMutation } = require('@hooks')

  const { p } = useTheme()
  const addToWatchlistMutate = useStocketMutation(ADD_TO_WATCHLIST)
  const removeFromWatchlistMutate = useStocketMutation(REMOVE_FROM_WATCHLIST)
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

export default AddToWatchlistButton
