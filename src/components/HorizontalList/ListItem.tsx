import { CARD_BACKGROUND } from '@utils/colors'
import { Text, Container } from '@components'
import {
  Image,
  ImageContainer,
  Button,
  ChangePctContainer,
  itemContainer,
} from './styles'
import { IEXQuote, PositionType } from 'types'

interface ListItemProps {
  item: IEXQuote | PositionType
  onPress: () => void
}

const ListItem = ({ item, onPress }: ListItemProps) => {
  const { change24hPct, symbol, logo } = item as IEXQuote & PositionType
  const color = change24hPct > 0 ? 'GREEN' : change24hPct < 0 ? 'RED' : 'WHITE'
  const bgColor =
    change24hPct > 0 ? '#71DB772A' : change24hPct < 0 ? '#EB455A2A' : CARD_BACKGROUND
  const positiveOrNegative = change24hPct > 0 ? '+' : ''

  return (
    <Button onPress={onPress}>
      <Container style={itemContainer}>
        <ImageContainer>
          <Image source={{ uri: logo }} resizeMode="contain" />
        </ImageContainer>
        <Text type="title" weight="Black">
          {symbol}
        </Text>
        <ChangePctContainer style={{ backgroundColor: bgColor }}>
          <Text weight="Medium" color={color}>
            {positiveOrNegative}
            {change24hPct.toFixed(2)}%
          </Text>
        </ChangePctContainer>
      </Container>
    </Button>
  )
}

export default ListItem
