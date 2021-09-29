import { PositionType } from 'types'
import Item from './Item'

const PositionItem = ({ item, onPress }: PositionItemProps) => {
  const { symbol, logo, change24hPct } = item

  return <Item change={change24hPct} logo={logo} symbol={symbol} onPress={onPress} />
}

interface PositionItemProps {
  item: PositionType
  onPress: () => void
}

export default PositionItem
