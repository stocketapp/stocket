import { PositionType } from 'types'
import Item from './Item'

const PositionItem = ({ item, onPress }: PositionItemProps) => {
  const { totalGainsPct, symbol, logo } = item

  return <Item change={totalGainsPct} logo={logo} symbol={symbol} onPress={onPress} />
}

interface PositionItemProps {
  item: PositionType
  onPress: () => void
}

export default PositionItem
