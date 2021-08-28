import { IEXQuote } from 'types'
import Item from './Item'

const ListItem = ({ item, onPress }: ListItemProps) => {
  const { changePercent, symbol, logo } = item

  return <Item change={changePercent} logo={logo} symbol={symbol} onPress={onPress} />
}

interface ListItemProps {
  item: IEXQuote
  onPress: () => void
}

export default ListItem
