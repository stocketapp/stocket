import { TouchableOpacity } from 'react-native'
import { Text, Container, AddToWatchlistButton } from '@components'
import theme from '@theme'

const { p, colors } = theme

const ResultItem = ({ item, setStock }: ResultItemProps) => (
  <TouchableOpacity onPress={setStock} style={{ width: '100%' }}>
    <Container
      separate
      horizontal
      pv={p.lg}
      style={{ backgroundColor: colors.BG_DARK_CARD }}
    >
      <Container style={{ width: '50%', backgroundColor: colors.BG_DARK_CARD }}>
        <Text weight="Black" type="label">
          {item?.symbol}
        </Text>
        <Text color="GRAY" style={{ paddingTop: p.sm }} weight="Medium">
          {item?.securityName}
        </Text>
      </Container>

      <AddToWatchlistButton symbol={item?.symbol} />
    </Container>
  </TouchableOpacity>
)

export default ResultItem

export interface ResultItemProps {
  setStock: () => void
  item: ResultObj
}

export interface ResultObj {
  securityName: string
  symbol: string
}
